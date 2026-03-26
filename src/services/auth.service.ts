import { User, UserRole, UserStatus } from '@/entities/user.entity';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '@/dtos/auth.dto';
import { AppError } from '@/utils/appError';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';

export class AuthService {

  private signToken(userId: string, role: UserRole) {
    const expiresInAccess = (process.env.JWT_ACCESS_EXPIRES_IN as string) || '1d';
    const expiresInRefresh = (process.env.JWT_REFRESH_EXPIRES_IN as string) || '7d';

    const accessToken = jwt.sign({ id: userId, role }, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: expiresInAccess,
    } as SignOptions);
    const refreshToken = jwt.sign({ id: userId, role }, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: expiresInRefresh,
    } as SignOptions);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string | null) {
    if (refreshToken) {
      const salt = await bcrypt.genSalt(10);
      const hashedToken = await bcrypt.hash(refreshToken, salt);
      await User.update({ id: userId }, { refreshToken: hashedToken });
    } else {
      await User.update({ id: userId }, { refreshToken: null });
    }
  }

  async register(data: RegisterDto) {
    const existingUser = await User.findOne({
      where: [
        { email: data.email },
        { phone: data.phone }
      ]
    });
    if (existingUser) {
      if (existingUser.email === data.email) throw new AppError('Email này đã được sử dụng!', 400);
      if (existingUser.phone === data.phone) throw new AppError('Số điện thoại này đã được sử dụng!', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);

    // Tạo email verify token (raw) — lưu trực tiếp vào DB (không hash vì chỉ cần match chính xác)
    const rawVerifyToken = crypto.randomBytes(32).toString('hex');
    const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 giờ

    const newUser = User.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      userType: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      walletBalance: 0,
      greenPoints: 0,
      isEmailVerified: false,
      emailVerifyToken: rawVerifyToken,
      emailVerifyExpires: verifyExpires,
    });

    await User.save(newUser);

    try {
      await sendVerificationEmail(newUser.email, rawVerifyToken);
    } catch (_) {
    }

    const tokens = this.signToken(newUser.id, newUser.userType);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return {
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        userType: newUser.userType,
        status: newUser.status,
        isEmailVerified: newUser.isEmailVerified,
      }, ...tokens
    };
  }

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  async login(data: LoginDto) {
    const isEmail = data.identifier?.includes('@');

    const user = await User.findOne({
      where: isEmail ? { email: data.identifier } : { phone: data.identifier },
      select: ['id', 'email', 'password', 'fullName', 'userType', 'status', 'profileImageUrl', 'isEmailVerified'],
    });

    if (!user || !(await bcrypt.compare(data.password!, user.password))) {
      throw new AppError('Email/Số điện thoại hoặc mật khẩu không đúng', 401);
    }
    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError(`Tài khoản của bạn đã bị ${user.status}`, 403);
    }
    const token = this.signToken(user.id, user.userType);
    await this.updateRefreshToken(user.id, token.refreshToken);
    const { password, refreshToken: rt, ...userResponse } = user;
    return { user: userResponse, ...token };
  }

  // ─── LOGOUT ──────────────────────────────────────────────────────────────
  async logout(userId: string) {
    await this.updateRefreshToken(userId, null);
  }

  // ─── REFRESH TOKEN ───────────────────────────────────────────────────────
  async refreshTokens(rawRefreshToken: string) {
    try {
      const decoded = jwt.verify(rawRefreshToken, process.env.JWT_REFRESH_SECRET as string) as any;
      const user = await User.findOne({
        where: { id: decoded.id },
        select: ['id', 'refreshToken', 'userType']
      });
      if (!user || !user.refreshToken) throw new AppError('Truy cập bị từ chối', 403);

      const isMatch = await bcrypt.compare(rawRefreshToken, user.refreshToken);
      if (!isMatch) throw new AppError('Token không hợp lệ, hoặc đã bị thay đổi', 403);

      const tokens = this.signToken(user.id, user.userType);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new AppError('Refresh token hết hạn hoặc không hợp lệ', 403);
    }
  }

  // ─── VERIFY EMAIL ────────────────────────────────────────────────────────
  async verifyEmail(token: string) {
    const user = await User.findOne({
      where: { emailVerifyToken: token },
      select: ['id', 'emailVerifyToken', 'emailVerifyExpires', 'isEmailVerified'],
    });

    if (!user) throw new AppError('Token xác thực không hợp lệ', 400);

    if (user.isEmailVerified) throw new AppError('Email đã được xác thực trước đó', 400);

    if (!user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      throw new AppError('Token xác thực đã hết hạn, vui lòng đăng ký lại hoặc yêu cầu gửi lại email', 400);
    }

    await User.update(user.id, {
      isEmailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpires: null,
    });
  }

  // ─── FORGOT PASSWORD ─────────────────────────────────────────────────────
  async forgotPassword(data: ForgotPasswordDto) {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) return;

    const rawResetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(rawResetToken).digest('hex');
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

    await User.update(user.id, {
      passwordResetToken: hashedResetToken,
      passwordResetExpires: resetExpires,
    });

    await sendPasswordResetEmail(user.email, rawResetToken);
  }

  async resetPassword(data: ResetPasswordDto) {
    const hashedToken = crypto.createHash('sha256').update(data.token).digest('hex');

    const user = await User.findOne({
      where: { passwordResetToken: hashedToken },
      select: ['id', 'passwordResetToken', 'passwordResetExpires'],
    });
    if (!user) throw new AppError('Token đặt lại mật khẩu không hợp lệ', 400);

    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new AppError('Token đặt lại mật khẩu đã hết hạn, vui lòng thử lại', 400);
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await User.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      refreshToken: null,
    });
  }
}