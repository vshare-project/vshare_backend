import { LoginDto, RegisterDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto } from "@/dtos/auth.dto";
import { User } from "@/entities";
import { AuthService } from "@/services/auth.service";
import { AppError } from "@/utils/appError";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const authService = new AuthService();

export class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Đăng ký tài khoản mới
   *     tags: [Auth]
   *     operationId: register
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterDto'
   *     responses:
   *       201:
   *         description: Đăng ký thành công, email xác thực đã được gửi
   *       400:
   *         description: Dữ liệu không hợp lệ hoặc email đã tồn tại
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(RegisterDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      const result = await authService.register(dto);
      res.status(201).json({
        status: "success",
        message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Đăng nhập hệ thống
   *     tags: [Auth]
   *     operationId: login
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDto'
   *     responses:
   *       200:
   *         description: Đăng nhập thành công
   *       401:
   *         description: Email hoặc mật khẩu sai
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(LoginDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      const result = await authService.login(dto);
      res.status(200).json({
        status: "success",
        message: "Đăng nhập thành công",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Làm mới Access Token
   *     tags: [Auth]
   *     operationId: refreshToken
   */
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw new AppError("Vui lòng cung cấp refresh token", 400);
      const result = await authService.refreshTokens(refreshToken);
      res.status(200).json({
        status: "success",
        message: "Refresh token thành công",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Đăng xuất
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   */
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user as User;
      if (!user || !user.id) throw new AppError("Unauthorized", 401);
      await authService.logout(user.id);
      res.status(200).json({
        status: "success",
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/verify-email:
   *   post:
   *     summary: Xác thực email sau khi đăng ký
   *     tags: [Auth]
   *     operationId: verifyEmail
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [token]
   *             properties:
   *               token:
   *                 type: string
   *                 description: Token nhận được trong email xác thực
   *     responses:
   *       200:
   *         description: Xác thực email thành công
   *       400:
   *         description: Token không hợp lệ hoặc đã hết hạn
   */
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(VerifyEmailDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      await authService.verifyEmail(dto.token);
      res.status(200).json({
        status: "success",
        message: "Xác thực email thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/forgot-password:
   *   post:
   *     summary: Yêu cầu đặt lại mật khẩu
   *     tags: [Auth]
   *     operationId: forgotPassword
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email]
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: Nếu email tồn tại, link đặt lại đã được gửi
   */
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(ForgotPasswordDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      await authService.forgotPassword(dto);
      // Luôn trả 200 dù email có tồn tại hay không (tránh lộ thông tin)
      res.status(200).json({
        status: "success",
        message: "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật khẩu.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/reset-password:
   *   post:
   *     summary: Đặt lại mật khẩu bằng token
   *     tags: [Auth]
   *     operationId: resetPassword
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [token, newPassword]
   *             properties:
   *               token:
   *                 type: string
   *               newPassword:
   *                 type: string
   *                 minLength: 6
   *     responses:
   *       200:
   *         description: Đặt lại mật khẩu thành công
   *       400:
   *         description: Token không hợp lệ hoặc đã hết hạn
   */
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(ResetPasswordDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      await authService.resetPassword(dto);
      res.status(200).json({
        status: "success",
        message: "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.",
      });
    } catch (error) {
      next(error);
    }
  }
}