import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleType } from './vehicle.entity';
import { Subscription } from './subscription.entity';


@Entity('subscription_plans')
export class SubscriptionPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; 

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column()
  durationDays!: number; 

  @Column({
    type: 'enum',
    enum: VehicleType,
    nullable: true,
  })
  vehicleType?: VehicleType; 

  @Column({ type: 'int', nullable: true })
  maxRidesPerDay?: number; 

  @Column({ type: 'int', nullable: true })
  maxMinutesPerRide?: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountPercent!: number; 

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'simple-array', nullable: true })
  features?: string[]; // Danh sách tính năng hiển thị

  @OneToMany(() => Subscription, (s) => s.plan)
  subscriptions!: Subscription[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}