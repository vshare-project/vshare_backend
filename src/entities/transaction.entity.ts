import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Rental } from "./rental.entity";

export enum TransactionType {
  PAYMENT = 'payment',
  TOPUP = 'top_up',
  REFUND = 'refund',
  REWARD = 'reward',
  PENALTY = 'penalty',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('transactions')
@Index(['userId', 'createdAt'])
export class Transaction extends CustomBaseEntity {
  @Column({})
  userId!: string;

  @Column({ nullable: true })
  rentalId?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: TransactionType
  })
  type!: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status!: TransactionStatus;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  paymentGateway!: string; // Ví dụ: 'Stripe', 'PayPal', 'momo'

  @Column({ nullable: true })
  externalTransactionId?: string; // ID giao dịch từ cổng thanh toán bên thứ ba

  @Column({ type: 'json', nullable: true })
  metadata?: {
    voucherCode?: string;
    voucherDiscount?: number;
    greenPoints?: number;
    gatewayResponse?: any;
    [key: string]: any;
  }

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Rental)
  @JoinColumn({ name: 'rentalId' })
  rental?: Rental;

}