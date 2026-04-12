import { CustomBaseEntity } from '@/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { SubscriptionPlan } from './subscriptionplan.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

/**
 * Instance gói đăng ký của một user cụ thể.
 * Khi user mua gói → tạo 1 record Subscription từ SubscriptionPlan.
 */
@Entity('subscriptions')
@Index(['userId', 'status'])
export class Subscription extends CustomBaseEntity {
  @Column()
  userId!: number;

  @Column()
  planId!: number;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status!: SubscriptionStatus;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePaid!: number; // Giá thực tế đã thanh toán (có thể khác giá gốc nếu có khuyến mãi)

  @Column({ type: 'int', default: 0 })
  ridesUsedToday!: number; // Số chuyến đã dùng hôm nay

  @Column({ type: 'date', nullable: true })
  lastRideDate?: Date; // Ngày dùng chuyến cuối → reset ridesUsedToday

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'planId' })
  plan!: SubscriptionPlan;
}