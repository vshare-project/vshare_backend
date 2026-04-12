import { CustomBaseEntity } from '@/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum NotificationType {
  RENTAL_START = 'rental_start',
  RENTAL_END = 'rental_end',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  LOW_BATTERY = 'low_battery',         // Cảnh báo pin xe yếu
  SUBSCRIPTION_EXPIRING = 'subscription_expiring', // Gói sắp hết hạn
  SUBSCRIPTION_EXPIRED = 'subscription_expired',
  VOUCHER_RECEIVED = 'voucher_received',
  SYSTEM = 'system',                   // Thông báo hệ thống chung
  MAINTENANCE = 'maintenance',         // Xe vào bảo trì
}

@Entity('notifications')
@Index(['userId', 'isRead'])
@Index(['userId', 'createdAt'])
export class Notification extends CustomBaseEntity {
  @Column()
  userId!: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type!: NotificationType;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ default: false })
  isRead!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt?: Date;

  // Deep link hoặc referenceId để navigate khi click notification
  @Column({ nullable: true })
  refType?: string; // 'rental' | 'transaction' | 'voucher'

  @Column({ nullable: true })
  refId?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;
}