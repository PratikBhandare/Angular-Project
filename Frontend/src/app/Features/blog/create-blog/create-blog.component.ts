import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { title } from 'process';
import { BlogService } from '../blog.service';
import { Blog } from '../../../Interfaces/Blog';
import { setMaxIdleHTTPParsers } from 'http';

@Component({
  selector: 'app-create-blog',
  standalone: false,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
  constructor(private blogService:BlogService){

  }

  BlogForm:any = new FormGroup({
    title:new FormControl(""),
    description:new FormControl(""),
    content:new FormControl(""),
    category:new FormControl(""),
    img:new FormControl("")
  })


  formData=new FormData();

  imgName:string=""

  onFileSelected(event:any) {
    event.preventDefault();

    const file:File = event.target.files[0];

    if (file) {
        this.formData.append("bimg", file);
        console.log("file:in formdata",this.formData.get('bimg'));
        this.imgName= file.name;
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
    }
  
  }
  

  create(){
    this.BlogForm.value.img=this.imgName;
  
    this.blogService.createBlog(this.BlogForm.value,this.formData)

  }
}
