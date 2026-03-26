import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { User } from "./user.entity";

export enum ReportType {
  DAMAGE = 'damage',           // Hỏng hóc chung
  BATTERY = 'battery',          // Pin hết/yếu
  ACCIDENT = 'accident',        // Tai nạn
  MAINTENANCE = 'maintenance',  // Bảo trì định kỳ
}

export enum ReportStatus {
  OPEN = 'open',
  FIXING = 'fixing',
  RESOLVED = 'resolved',
}

@Entity('vehicle_reports')
@Index(['vehicleId', 'status'])
export class VehicleReport extends CustomBaseEntity {
  @Column()
  vehicleId!: number;

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  type!: ReportType;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.OPEN,
  })
  status!: ReportStatus;

  @Column({ type: 'text' })
  description!: string;

  // OPTIONAL FIELDS
  @Column({ nullable: true })
  reportedBy?: string;

  @Column({ nullable: true })
  rentalId?: string; // Nếu xảy ra trong rental

  @Column({ nullable: true })
  handledBy?: string; // Staff ID

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  @Column({ type: 'simple-array', nullable: true })
  images?: string[];

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reportedBy' })
  reporter?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'handledBy' })
  handler?: User;
}