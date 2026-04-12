import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum DevicePlatform {
  IOS = 'ios',
  ANDROID = 'android',
}

@Entity('device_tokens')
@Index(['userId'])
@Index(['token'], { unique: true })
export class DeviceToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ unique: true })
  token!: string; // FCM token hoặc APNs token

  @Column({
    type: 'enum',
    enum: DevicePlatform,
  })
  platform!: DevicePlatform;

  @Column({ nullable: true })
  deviceModel?: string; // iPhone 15, Samsung S24…

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}