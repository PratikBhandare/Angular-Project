import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Post } from './post';
import { User } from './users';

@Entity("commentsTable_Blog")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Post, post => post.comments,{onDelete:"CASCADE"})
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
