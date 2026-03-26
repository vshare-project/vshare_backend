import { SubscriptionType } from "@/entities/subscriptionplan.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsBoolean } from "class-validator";


export class CreateSubscriptionPlanDto {
  @IsNotEmpty({ message: 'Tên gói không được để trống' })
  @IsString()
  name!: string;

  @IsNotEmpty({message: 'Loại gói không được để trống'})
  @IsEnum(SubscriptionType)
  type!: SubscriptionType;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  durationDays!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountValue?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateSubscriptionPlanDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEnum(SubscriptionType) type?: SubscriptionType;
  @IsOptional() @IsNumber() price?: number;
  @IsOptional() @IsNumber() durationDays?: number;
  @IsOptional() @IsNumber() discountValue?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsString() description?: string;
}