import { User } from "./user";

export interface Blog{

    id:number;

    title:String|null;

    description:String|null;

    content:string|null;

    img:string|null;

    category:string|null;

    author:any|null;

    likesCount:number;

    views:number|null;

    comments:any|null;

    isActive:boolean,

    createdAt:Date|null,



 
//   author: User;

//   @OneToMany(() => Comment, comment => comment.post)
//   comments: Comment[];

//   @OneToMany(() => Like, like => like.post)
//   likes: Like[];

//   @Column({ default: 0 })
//   likesCount: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @Column({ default: 0 })
//   views: number;

//   @Column({ default: 0 })
//   shares: number;

//   @Column({ default: true })
//   isActive: boolean; 
}