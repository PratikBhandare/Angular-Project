import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { log } from 'console';
import { User } from '../../../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
check() {
console.log("Check''''");

}
  constructor(private userService:UserService,private http:HttpClient,private router:Router){
    
  }
  ngOnInit(): void {
    if(this.userService.logged){
      this.router.navigate(["user/profile"])
    }
  }

  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  })

  login(){
    let user:Partial<User>=this.loginForm.value;
    this.userService.login(user);
  }



}
