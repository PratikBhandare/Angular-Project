import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './users';
import "reflect-metadata"
@Entity("SubscriptionTable_Blog")
export class Subscription {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.subscriptions,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: User;  

  @ManyToOne(() => User, user => user.followers)
  @JoinColumn({ name: 'author_id' })
  author: User;  

  @CreateDateColumn()
  createdAt: Date;  

  @Column({ default: true })
  isActive: boolean;
}
