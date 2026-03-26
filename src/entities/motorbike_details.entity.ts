import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum MotorbikeType {
  SCOOTER = 'scooter',     // Xe tay ga
  MANUAL = 'manual',       // Xe số
  SPORT = 'sport',         // Xe thể thao
}

@Entity('motorbike_details')
export class MotorbikeDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // ─── Thông số kỹ thuật ────────────────────────────────────
  @Column({
    type: 'enum',
    enum: MotorbikeType,
    default: MotorbikeType.SCOOTER,
  })
  motorbikeType!: MotorbikeType; // Loại xe máy

  @Column({ nullable: true })
  motorPowerW?: number; // Công suất động cơ điện (W), ví dụ: 3000

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  batteryCapacityKwh?: number; // Dung lượng pin (kWh)

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  maxSpeedKmh?: number; // Tốc độ tối đa (km/h)

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
  chargingTimeHour?: number; // Thời gian sạc đầy (giờ)

  @Column({ nullable: true })
  weightKg?: number; // Trọng lượng xe (kg)

  @Column({ nullable: true })
  maxLoadKg?: number; // Tải trọng tối đa (kg)

  // ─── Trang bị / tiện ích ─────────────────────────────────
  @Column({ default: false })
  hasHelmetStorage!: boolean; // Có cốp để mũ bảo hiểm

  @Column({ default: false })
  hasUSBCharger!: boolean; // Có cổng sạc USB

  @Column({ default: false })
  hasAntiLockBrakes!: boolean; // Phanh ABS

  @Column({ default: false })
  hasGPS!: boolean; // GPS định vị tích hợp

  @Column({ type: 'simple-array', nullable: true })
  features?: string[]; // Trang bị thêm tùy chỉnh

  // ─── Relation ─────────────────────────────────────────────
  @OneToOne(() => Vehicle, (v) => v.motorbikeDetails)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;
}