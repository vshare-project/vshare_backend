import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum TransmissionType {
  MANUAL = 'manual',       // Số sàn
  AUTOMATIC = 'automatic', // Số tự động
  CVT = 'cvt',             // Vô cấp
}

export enum DriveMode {
  TWO_WHEEL = '2wd',   // Cầu trước/sau
  FOUR_WHEEL = '4wd',  // 4 bánh chủ động
}

@Entity('car_details')
export class CarDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 4 })
  capacity!: number; // Số chỗ ngồi (4, 5, 7, 9…)

  @Column({ default: 4 })
  numDoors!: number; // Số cửa

  @Column({
    type: 'enum',
    enum: TransmissionType,
    default: TransmissionType.AUTOMATIC,
  })
  transmissionType!: TransmissionType; // Loại hộp số

  @Column({
    type: 'enum',
    enum: DriveMode,
    default: DriveMode.TWO_WHEEL,
    nullable: true,
  })
  driveMode?: DriveMode; // Chế độ dẫn động

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  motorPowerKw?: number; // Công suất động cơ điện (kW)

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  batteryCapacityKwh?: number; // Dung lượng pin (kWh)

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  maxSpeedKmh?: number; // Tốc độ tối đa (km/h)

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  chargingTimeHour?: number; // Thời gian sạc đầy (giờ)

  @Column({ default: true })
  hasAirConditioning!: boolean; // Điều hòa

  @Column({ default: false })
  hasSunroof!: boolean; // Cửa sổ trời

  @Column({ default: false })
  hasGPS!: boolean; // GPS định vị tích hợp

  @Column({ default: false })
  hasBackupCamera!: boolean; // Camera lùi

  @Column({ default: false })
  hasBlindSpotMonitor!: boolean; // Cảnh báo điểm mù

  @Column({ type: 'simple-array', nullable: true })
  features?: string[]; // Trang bị thêm tùy chỉnh

  @OneToOne(() => Vehicle, (v) => v.carDetails)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;
}