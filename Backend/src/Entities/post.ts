import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './comment';
import { Like } from './like';
import { User } from './users';

@Entity("PostTable_Blog")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  category: string;

  @Column('text')
  content: string;

  @Column()
  img:string;

  @ManyToOne(() => User, user => user.posts,{onDelete:"CASCADE"})
  author: User;

  @OneToMany(() => Comment, comment => comment.post,{onDelete:"CASCADE"})
  comments: Comment[];

  @OneToMany(() => Like, like => like.post, {cascade:true})
  likes: Like[];

  @Column({ default: 0 })
  likesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  shares: number;

  @Column({ default: false })
  isActive: boolean; // This is for soft delete or hiding the post.
}
