import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CustomBaseEntity } from "@/utils/base.entity";
import { Subscription } from "./subscription.entity";

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  STAFF = 'staff',

}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  OTHER = 'other',
}

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, length: 20 })
  phone!: string;

  @Column({ select: false })
  password!: string;


  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  userType!: UserRole;

  @Column({ nullable: true })
  driverLicense?: string; // URL ảnh bằng lái xe

  @Column({ default: 0 })
  greenPoints!: number; // Điểm xanh

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  walletBalance!: number; // Số dư ví

  @Column({ type: 'varchar', nullable: true, select: false })
  refreshToken?: string | null;

  // ─── Email Verification ───────────────────────────────────────────────────
  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ type: 'varchar', nullable: true, select: false })
  emailVerifyToken?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifyExpires?: Date | null;

  // ─── Password Reset ───────────────────────────────────────────────────────
  @Column({ type: 'varchar', nullable: true, select: false })
  passwordResetToken?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires?: Date | null;

  @Column({ nullable: true })
  subscriptionId?: number;

  @OneToOne(() => Subscription)
  @JoinColumn({ name: 'subscriptionId' })
  subscription?: Subscription;

} 