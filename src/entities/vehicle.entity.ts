import { CustomBaseEntity } from '@/utils/base.entity';
import { Station } from './station.entity';
import { CarDetails } from './car_details.entity';
import { MotorbikeDetails } from './motorbike_details.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

export enum VehicleType {
  BIKE = 'bike',
  MOTORBIKE = 'motorbike',
  CAR = 'car',
}

export enum VehicleStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',         // đang sử dụng
  MAINTENANCE = 'maintenance', // đang bảo trì
  LOW_BATTERY = 'low_battery', // pin yếu
}

@Entity('vehicles')
@Index(['stationId', 'status'])
export class Vehicle extends CustomBaseEntity {
  @Column({ unique: true })
  vehicleCode!: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  vehicleType!: VehicleType;

  @Column()
  brand!: string; // Hãng xe (VinFast, Honda, Toyota…)

  @Column()
  model!: string; // Model xe (VF3, Wave Alpha, Vios…)

  @Column({ nullable: true })
  color?: string; // Màu sắc

  @Column({ nullable: true })
  year?: number; // Năm sản xuất

  @Column({ nullable: true })
  licensePlate?: string; // Biển số xe

  @Column()
  batteryLevel!: number; // Mức pin (0-100)

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rangeKm?: number; // Phạm vi hoạt động (km trên 1 lần sạc đầy)

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.AVAILABLE,
  })
  status!: VehicleStatus;

  @Column({ nullable: true })
  stationId?: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  currentLat?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  currentLong?: number;

  @Column({ type: 'date', nullable: true })
  lastMaintenanceDate?: Date;

  @Column({ type: 'simple-array', nullable: true })
  issueImages?: string[];

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'stationId' })
  station?: Station;

  @OneToOne(() => CarDetails, (d) => d.vehicle, {
    cascade: true,
    nullable: true,
    eager: false,
  })
  carDetails?: CarDetails;

  @OneToOne(() => MotorbikeDetails, (d) => d.vehicle, {
    cascade: true,
    nullable: true,
    eager: false,
  })
  motorbikeDetails?: MotorbikeDetails;
}
