import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from './post';
import { User } from './users';
@Entity("likesTable_Blog")
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.id,{onDelete:"CASCADE"})
  post: Post;
  
  @ManyToOne(() => User, user => user.likes)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
