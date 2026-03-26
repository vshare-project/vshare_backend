import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity } from "typeorm";

export enum SubscriptionType {
  STUDENT = 'student',
  BASIC = 'basic',
  PREMIUM = 'premium',
}

@Entity('subscription_plans')
export class SubscriptionPlan extends CustomBaseEntity {
  @Column()
  name!: string; 

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.STUDENT
  })
  type!: SubscriptionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column()
  durationDays!: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountValue!: number; 

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;
}