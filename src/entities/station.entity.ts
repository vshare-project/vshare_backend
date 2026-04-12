import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum StationType {
  PUBLIC = 'public',
  UNIVERSITY = 'university',
  COMMERCIAL = 'commercial',
  RESIDENTIAL = 'residential'
}

@Entity('stations')
@Index(['latitude', 'longitude'])
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  stationName!: string;

  @Column()
  address!: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude!: number;

  @Column()
  totalSlots!: number;

  @Column()
  availableSlots!: number; // số lượng chỗ có sẵn

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  totalChargingSlots!: number; // Tổng số cổng sạc
 
  @Column({ default: 0 })
  availableChargingSlots!: number; // Cổng sạc còn trống

  @Column({
    type: 'enum',
    enum: StationType,
    default: StationType.PUBLIC
  })
  stationType!: StationType;

  @Column({ type: 'simple-array', nullable: true })
  imageUrls?: string[];

  @Column({ type: 'time', nullable: true, default: '23:00:00' })
  closeTime?: string;

  @Column({ type: 'time', nullable: true, default: '07:00:00' })
  openTime?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}