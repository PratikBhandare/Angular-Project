import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata"

import { Post } from "./post";
import { Like } from "./like";
import { Comment } from "./comment";
import { Subscription } from "./subscription";
import { Notification } from "./notification";

@Entity("UsersTable_Blog")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    profileImg: string;

    @OneToMany(() => Post, post => post.author, { cascade: true })
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Like, like => like.user, { cascade: true })
    likes: Like[];

    @OneToMany(()=>Notification, notification=>notification.user, {cascade:true})
    notifications:Notification[]

    @Column({ default: true })
    isActive: boolean; 


    @OneToMany(() => Subscription, subscription => subscription.user,{cascade:true})
    subscriptions: Subscription[];  

    @OneToMany(() => Subscription, subscription => subscription.author)
    followers: Subscription[];  
}
