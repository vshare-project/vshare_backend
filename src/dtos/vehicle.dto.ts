import { VehicleStatus, VehicleType } from "@/entities";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsString, Min, Max, IsOptional, IsNumber, IsArray, IsObject } from "class-validator";

export function ParseJson() {
  return Transform(({ value }) => {
    try {
      if (typeof value === 'string') return JSON.parse(value);
      return value;
    } catch (error) {
      return value;
    }
  });
}

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'Mã Xe không được để trống !' })
  @IsString()
  vehicleCode!: string;

  @IsNotEmpty({ message: 'Loại Xe không được để trống !' })
  @IsEnum(VehicleType)
  vehicleType!: VehicleType;

  @IsNotEmpty({ message: 'Hãng xe không được để trống !' })
  @IsString()
  brand!: string;

  @IsNotEmpty({ message: 'Model xe không được để trống !' })
  @IsString()
  model!: string;

  @IsOptional() @IsString() color?: string;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() year?: number;
  @IsOptional() @IsString() licensePlate?: string;

  @IsNotEmpty({ message: 'Mức pin không được để trống !' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(100)
  batteryLevel!: number;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() rangeKm?: number;

  @IsNotEmpty({ message: 'Trạng thái không được để trống !' })
  @IsEnum(VehicleStatus)
  status!: VehicleStatus;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  stationId?: number;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() currentLat?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() currentLong?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  issueImages?: string[];

  // Nested Details
  @IsOptional()
  @ParseJson()
  @IsObject()
  carDetails?: any;

  @IsOptional()
  @ParseJson()
  @IsObject()
  motorbikeDetails?: any;
}

export class UpdateVehicleDto {
  @IsOptional() @IsString() vehicleCode?: string;
  @IsOptional() @IsEnum(VehicleType) vehicleType?: VehicleType;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() model?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() year?: number;
  @IsOptional() @IsString() licensePlate?: string;

  @IsOptional() @IsEnum(VehicleStatus) status?: VehicleStatus;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @Max(100)
  batteryLevel?: number;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() rangeKm?: number;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() stationId?: number;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() currentLat?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() currentLong?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  issueImages?: string[];

  // Nested Details
  @IsOptional()
  @ParseJson()
  @IsObject()
  carDetails?: any;

  @IsOptional()
  @ParseJson()
  @IsObject()
  motorbikeDetails?: any;
}