import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, Index } from "typeorm";

export enum VoucherType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_MINUTES = 'free_minutes',
}

@Entity('vouchers')
export class Voucher  extends CustomBaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column({type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: VoucherType,
  })
  type!: VoucherType;
  
  @Column({type: 'decimal', precision: 10, scale: 2 })
  value!: number;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column({ type: 'int', nullable: true })
  maxUses?: number; 

  @Column({ type: 'int', default: 0 })
  usedCount!: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minAmount?: number; 


  @Column({default: true})
  isActive!: boolean;

}