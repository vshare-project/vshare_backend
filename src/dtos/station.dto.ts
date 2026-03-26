import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { StationType } from "@/entities/station.entity";

export class CreateStationDto {
  @IsNotEmpty({ message: 'Tên trạm không được để trống!' })
  @IsString()
  stationName!: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống!' })
  @IsString()
  address!: string;

  @IsNotEmpty({ message: 'Vĩ độ không được để trống!' })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Vĩ độ phải là số!' })
  @Min(-90, { message: 'Vĩ độ phải từ -90 đến 90!' })
  @Max(90, { message: 'Vĩ độ phải từ -90 đến 90!' })
  latitude!: number;

  @IsNotEmpty({ message: 'Kinh độ không được để trống!' })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Kinh độ phải là số!' })
  @Min(-180, { message: 'Kinh độ phải từ -180 đến 180!' })
  @Max(180, { message: 'Kinh độ phải từ -180 đến 180!' })
  longitude!: number;

  @IsNotEmpty({ message: 'Tổng số chỗ không được để trống!' })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Tổng số chỗ phải là số!' })
  @Min(1, { message: 'Tổng số chỗ phải lớn hơn 0!' })
  totalSlots!: number;

  @IsNotEmpty({ message: 'Số chỗ khả dụng không được để trống!' })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Số chỗ khả dụng phải là số!' })
  @Min(0, { message: 'Số chỗ khả dụng phải lớn hơn hoặc bằng 0!' })
  availableSlots!: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  universityName?: string;

  @IsOptional()
  @IsEnum(StationType, { message: 'Loại trạm không hợp lệ!' })
  stationType?: StationType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Giờ đóng cửa phải có định dạng HH:MM:SS!'
  })
  closeTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Giờ mở cửa phải có định dạng HH:MM:SS!'
  })
  openTime?: string;
}

export class UpdateStationDto {
  @IsOptional()
  @IsString()
  stationName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? Number(value) : value)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? Number(value) : value)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? Number(value) : value)
  @IsNumber()
  @Min(1)
  totalSlots?: number;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? Number(value) : value)
  @IsNumber()
  @Min(0)
  availableSlots?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  universityName?: string;

  @IsOptional()
  @IsEnum(StationType)
  stationType?: StationType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
  closeTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
  openTime?: string;
}
