import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../Features/blog/blog.service';
import { Blog } from '../../../Interfaces/Blog';
import { SHowBlogComponent } from '../../../Features/blog/show-blog/show-blog.component';
import { MessageService } from 'primeng/api';
import { User } from '../../../Interfaces/user';
import { UserService } from '../../../Features/user/user.service';

@Component({
  selector: 'app-g-form',
  standalone: false,
  templateUrl: './g-form.component.html',
  styleUrl: './g-form.component.css'
})
export class GFormComponent implements OnInit ,OnChanges{
  


  loggeduser!:any;


  @Input() fields: any[] = []; // Array of form field configurations
  @Input() formData: any = {}; // Default form data
  @Input() Data:any;
  @Input() class:string="";
  
  form!: FormGroup;
  @Input() blogId!:number;

  @Output()  value=new EventEmitter<any>();

  constructor(private fb: FormBuilder, private blogService:BlogService,private messageService:MessageService, private userService:UserService) {
    userService.loggedUser$.subscribe((val)=>{
      this.loggeduser=val;
    })
  }

  ngOnInit(): void {
    this.createForm();
    // console.log(this.show);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes",changes);
    
  }

  // Dynamically create the form controls based on the input fields
  createForm() {
    const group:any = {};

    this.fields.forEach(field => {
      group[field.name] = [this.formData[field.name]];
    });

    this.form = this.fb.group(group);
  }

  // Submit the form data
  onSubmit() {
    
   
      this.blogService.updateBlog(this.blogId,this.form.value,this.loggeduser.id).subscribe((val:any)=>{
        console.log(val);
        if(val.msg){
        // this.messageService.add({ severity: 'success', summary: '', detail: 'Updated !' })
          // this.messageService.add({severity:"success"})
          alert()

        }
        
      })
    
      console.log(this.form.value);
   
  }

  mysubMit(){
    console.log(this.form.value);

    
    
    // return this.form.value;

    this.value.emit(this.form.value)
  }
}
