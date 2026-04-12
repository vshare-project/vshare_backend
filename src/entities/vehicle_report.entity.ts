import { CustomBaseEntity } from '@/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

export enum VehicleReportStatus {
  PENDING = 'pending',       // Chờ xử lý
  IN_PROGRESS = 'in_progress', // Đang xử lý
  RESOLVED = 'resolved',     // Đã giải quyết
  DISMISSED = 'dismissed',   // Từ chối / không phải lỗi
}

export enum VehicleReportType {
  BATTERY = 'battery',           // Pin hỏng / không sạc được
  BRAKE = 'brake',               // Phanh lỗi
  TIRE = 'tire',                 // Lốp xe
  LOCK = 'lock',                 // Khóa xe lỗi
  GPS = 'gps',                   // GPS lỗi
  DISPLAY = 'display',           // Màn hình xe lỗi
  BODY_DAMAGE = 'body_damage',   // Thân xe móp/trầy
  OTHER = 'other',
}

@Entity('vehicle_reports')
@Index(['vehicleId', 'status'])
@Index(['reportedById'])
export class VehicleReport extends CustomBaseEntity {
  @Column()
  vehicleId!: number;

  @Column()
  reportedById!: number; // userId của người báo cáo

  @Column({ nullable: true })
  assignedToId?: number; // Staff được phân công xử lý

  @Column({ nullable: true })
  rentalId?: number; // Chuyến đang chạy khi phát hiện lỗi (nếu có)

  @Column({
    type: 'enum',
    enum: VehicleReportType,
    default: VehicleReportType.OTHER,
  })
  reportType!: VehicleReportType;

  @Column({
    type: 'enum',
    enum: VehicleReportStatus,
    default: VehicleReportStatus.PENDING,
  })
  status!: VehicleReportStatus;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'simple-array', nullable: true })
  imageUrls?: string[]; // Ảnh bằng chứng

  @Column({ type: 'text', nullable: true })
  staffNote?: string; // Ghi chú của staff sau khi xử lý

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reportedById' })
  reportedBy!: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;
}