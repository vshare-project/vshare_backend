import { IsDateString, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  fullName?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15, { message: 'Số điện thoại phải từ 10 đến 15 số' })
  phone?: string;


  @IsOptional()
  @IsDateString({}, { message: 'Ngày sinh phải đúng định dạng ISO (VD: 2000-01-01)' })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}