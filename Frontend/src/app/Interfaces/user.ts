import { Blog } from "./Blog";

export interface User{
    id:number|null;
    role:string|null;
    name:String|null;
    email:String|null;
    password:String|null;
    comments:any;
    profileImg:string;
    isActive:string;
    posts:Blog[];
    notifications:any[];
    followers:any[]
}