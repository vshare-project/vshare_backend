import { CustomBaseEntity } from '@/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { Station } from './station.entity';
import { Voucher } from './voucher.entity';
import { Subscription } from './subscription.entity';

export enum RentalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum RentalPaymentType {
  PAY_PER_USE = 'pay_per_use',
  SUBSCRIPTION = 'subscription',
}

// ─── THÊM MỚI ─────────────────────────────────────────────────────────────────
export enum RentalPaymentStatus {
  UNPAID = 'unpaid',       // Chưa thanh toán (active rental)
  PAID = 'paid',           // Đã thanh toán
  FAILED = 'failed',       // Thanh toán thất bại
  FREE = 'free',           // Miễn phí (dùng subscription hoặc voucher 100%)
}

@Entity('rentals')
@Index(['userId', 'status'])
@Index(['vehicleId', 'status'])
export class Rental extends CustomBaseEntity {
  @Column()
  userId!: number;

  @Column()
  vehicleId!: number;

  @Column()
  startStationId!: number;

  @Column({ nullable: true })
  endStationId?: number;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  @Column({
    type: 'enum',
    enum: RentalStatus,
    default: RentalStatus.ACTIVE,
  })
  status!: RentalStatus;

  @Column({
    type: 'enum',
    enum: RentalPaymentType,
    default: RentalPaymentType.PAY_PER_USE,
  })
  paymentType!: RentalPaymentType;

  // ─── THÊM MỚI: trạng thái thanh toán ─────────────────────────────────────
  @Column({
    type: 'enum',
    enum: RentalPaymentStatus,
    default: RentalPaymentStatus.UNPAID,
  })
  paymentStatus!: RentalPaymentStatus;
  // ──────────────────────────────────────────────────────────────────────────

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalCost!: number;

  @Column({ nullable: true })
  voucherId?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discount!: number;

  @Column({ nullable: true })
  ratingStars?: number;

  @Column({ nullable: true })
  ratingComment?: string;

  @Column({ type: 'int', default: 0 })
  greenPointsEarned!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distance?: number;

  @Column({ nullable: true })
  subscriptionId?: number;

  @ManyToOne(() => Subscription, { nullable: true })
  @JoinColumn({ name: 'subscriptionId' })
  subscription?: Subscription;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'startStationId' })
  startStation!: Station;

  @ManyToOne(() => Station, { nullable: true })
  @JoinColumn({ name: 'endStationId' })
  endStation?: Station;

  @ManyToOne(() => Voucher, { nullable: true })
  @JoinColumn({ name: 'voucherId' })
  voucher?: Voucher;
}