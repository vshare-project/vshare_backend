import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleType } from './vehicle.entity';

export enum PricingUnit {
  PER_MINUTE = 'per_minute',
  PER_HOUR = 'per_hour',
  PER_KM = 'per_km',
}

@Entity('pricing_rules')
export class PricingRule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // Tên rule, ví dụ: "Xe máy giờ thường"

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  vehicleType!: VehicleType;

  @Column({
    type: 'enum',
    enum: PricingUnit,
    default: PricingUnit.PER_MINUTE,
  })
  unit!: PricingUnit;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice!: number; // Giá mỗi đơn vị (VND)

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 1.0 })
  peakMultiplier!: number; // Hệ số giờ cao điểm, mặc định 1.0

  @Column({ type: 'int', default: 0 })
  freeMinutes!: number; // Số phút miễn phí đầu tiên

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxDailyPrice?: number; // Giá trần trong 1 ngày

  // ─── Khung giờ áp dụng (null = áp dụng cả ngày) ──────────────────────────
  @Column({ type: 'time', nullable: true })
  peakStartTime?: string; // ví dụ: '07:00:00'

  @Column({ type: 'time', nullable: true })
  peakEndTime?: string;   // ví dụ: '09:00:00'

  // ─── Ngày áp dụng (JSON array [0-6], 0=CN) ────────────────────────────────
  @Column({ type: 'simple-array', nullable: true })
  applicableDays?: string[]; // ['1','2','3','4','5'] = Thứ 2 - Thứ 6

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}