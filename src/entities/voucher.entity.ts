import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleType } from './vehicle.entity';

export enum VoucherType {
  PERCENT = 'percent',       // Giảm theo %
  FIXED = 'fixed',           // Giảm số tiền cố định
  FREE_MINUTES = 'free_minutes', // Tặng phút miễn phí
}

export enum VoucherStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

@Entity('vouchers')
@Index(['code'], { unique: true })
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 30 })
  code!: string; // Mã voucher: VSHARE2025, NEWUSER50…

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: VoucherType,
    default: VoucherType.FIXED,
  })
  type!: VoucherType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value!: number; // Giá trị: % hoặc VND hoặc số phút

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxDiscountAmount?: number; // Giảm tối đa (dùng khi type=PERCENT)

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minOrderAmount?: number; // Đơn tối thiểu để áp dụng

  @Column({ type: 'int', default: 0 })
  totalQuantity!: number; // Tổng số voucher phát hành (0 = không giới hạn)

  @Column({ type: 'int', default: 0 })
  usedCount!: number; // Số lần đã dùng

  @Column({ type: 'int', default: 1 })
  maxUsesPerUser!: number; // Mỗi user dùng tối đa bao nhiêu lần

  @Column({
    type: 'enum',
    enum: VoucherStatus,
    default: VoucherStatus.ACTIVE,
  })
  status!: VoucherStatus;

  @Column({
    type: 'enum',
    enum: VehicleType,
    nullable: true,
  })
  applicableVehicleType?: VehicleType; // null = áp dụng cho mọi loại xe

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}