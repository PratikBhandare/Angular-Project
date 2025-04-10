import { Blog } from "./Blog";
import { User } from "./user";

export interface Comment{

  
    content: string|null|undefined;

    post: Blog|number|null;
  
    author: User|number|null;
  
 
}