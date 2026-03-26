import { IsNotEmpty, IsString } from "class-validator";

export class PurchaseSubscriptionDto {
  @IsNotEmpty({ message: 'Vui lòng chọn gói cước (planId)' })
  @IsString()
  planId!: string;
}