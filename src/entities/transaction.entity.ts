import { CustomBaseEntity } from '@/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Rental } from './rental.entity';

export enum TransactionType {
  TOPUP = 'topup',               // Nạp tiền vào ví
  RENTAL_PAYMENT = 'rental_payment', // Thanh toán chuyến đi
  REFUND = 'refund',             // Hoàn tiền
  SUBSCRIPTION_PAYMENT = 'subscription_payment', // Mua gói tháng
  REWARD = 'reward',             // Thưởng điểm/hoàn tiền
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  VNPAY = 'vnpay',
  WALLET = 'wallet',       // Trừ từ ví nội bộ
  SUBSCRIPTION = 'subscription', // Trừ từ gói tháng
}

@Entity('transactions')
@Index(['userId', 'status'])
@Index(['userId', 'type'])
@Index(['vnpayTxnRef'], { unique: true, where: '"vnpayTxnRef" IS NOT NULL' })
export class Transaction extends CustomBaseEntity {
  @Column()
  userId!: number;

  @Column({ nullable: true })
  rentalId?: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type!: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status!: TransactionStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod!: PaymentMethod;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balanceBefore!: number; // Số dư ví trước giao dịch

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balanceAfter!: number;  // Số dư ví sau giao dịch

  // ─── VNPay fields ─────────────────────────────────────────────────────────
  @Column({ nullable: true })
  vnpayTxnRef?: string; // Mã giao dịch gửi sang VNPay (unique)

  @Column({ nullable: true })
  vnpayTransactionNo?: string; // Mã giao dịch VNPay trả về

  @Column({ nullable: true })
  vnpayBankCode?: string; // Ngân hàng thanh toán

  @Column({ nullable: true })
  vnpayResponseCode?: string; // Mã phản hồi từ VNPay

  @Column({ type: 'text', nullable: true })
  vnpayRawResponse?: string; // Lưu toàn bộ response raw để audit

  @Column({ nullable: true })
  description?: string; // Mô tả giao dịch hiển thị cho user

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Rental, { nullable: true })
  @JoinColumn({ name: 'rentalId' })
  rental?: Rental;
}