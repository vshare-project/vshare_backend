import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, Matches, IsInt } from 'class-validator';
import { UserRole } from '@/entities/user.entity'; // Import Enum từ Entity

export class RegisterDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName?: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsNotEmpty({ message: 'Số điện thoại là bắt buộc' })
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: 'Số điện thoại không hợp lệ (VN)' })
  phone?: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;




}

export class LoginDto {
  @IsNotEmpty({ message: 'Email hoặc số điện thoại bắt buộc' })
  identifier?: string; // Cho phép đăng nhập bằng cả Email hoặc Phone

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password?: string;
}

export class VerifyEmailDto {
  @IsNotEmpty({ message: 'Token xác thực không được để trống' })
  token!: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email!: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token không được để trống' })
  token!: string;

  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  newPassword!: string;
}