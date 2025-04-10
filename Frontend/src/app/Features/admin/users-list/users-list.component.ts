import { Component, OnInit } from '@angular/core';
import { User } from '../../../Interfaces/user';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

  UsersArray:User[]=[];

  constructor(private adminService:AdminService, private router:Router){

  }

  ngOnInit(): void {
    let r=this.adminService.getUsers().subscribe(val=>{
      // console.log("This is val",val);
      this.UsersArray=val as User[];
      ;
    })
    
  }

  openProfile(userId:number){
    console.log("Clicked");
    
    
    this.router.navigate(['user/profile/',userId])
  }

}
