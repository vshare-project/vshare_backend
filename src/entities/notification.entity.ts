import { CustomBaseEntity } from "@/utils/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('notifications')
@Index(['userId', 'isRead'])
export class Notification extends CustomBaseEntity {
  @Column()
  userId!: number;

  @Column()
  title!: string;
  
  @Column({ type: 'text' })
  message!: string;
  
  @Column({default: false})
  isRead!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt?: Date;

  @Column({ type: 'json', nullable: true })
  data?: Record<string, any>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;
}