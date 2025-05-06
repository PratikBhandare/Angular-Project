
import { Component } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../../Interfaces/user';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService:UserService,private http:HttpClient){

  }

  signUpForm = new FormGroup({
    name:new FormControl("",[Validators.required,Validators.pattern(/^(?!\s)(?!.*\s$)[^0-9]*$/)]),
    email:new FormControl("", [Validators.required, Validators.email]),
    password:new FormControl("",[Validators.required]),
    role:new FormControl("User"),
    profileImg:new FormControl("")
  })

 formData = new FormData();

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {
        this.formData.append("pimg", file);
        // console.log(this.formData.get('pimg'));
        this.signUpForm.value.profileImg = file.name;
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
    }
  }


  register(e:any){
    console.log(this.signUpForm.value);
    this.formData.append("user",JSON.stringify(this.signUpForm.value))
    // console.log("Inside form",this.formData.get("user"));
    
    this.userService.register(this.formData);
    this.formData.delete("user")
    this.formData.delete("pimg")
    e.preventDefault();

  }

}
