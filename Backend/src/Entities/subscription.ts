import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './users';
import "reflect-metadata"
@Entity("SubscriptionTable_Blog")
export class Subscription {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.subscriptions,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: User;  // Relationship with the user (the subscriber)

  @ManyToOne(() => User, user => user.followers)
  @JoinColumn({ name: 'author_id' })
  author: User;  // Relationship with the author (the user being subscribed to)

  @CreateDateColumn()
  createdAt: Date;  // Date the subscription was created

  @Column({ default: true })
  isActive: boolean;  // Whether the subscription is active
}
