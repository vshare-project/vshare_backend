import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User,  } from "./user.entity";
import { SubscriptionPlan } from "./subscriptionplan.entity";


export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

@Entity('subscriptions')
@Index(['userId', 'status'])
export class Subscription extends CustomBaseEntity {
  @Column()
  userId!: string;

  @Column()
  planId!: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE
  })
  status!: SubscriptionStatus;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAtPurchase!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'planId' })
  plan!: SubscriptionPlan;
}