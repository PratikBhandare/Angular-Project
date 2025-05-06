import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getBlogRequests(){
    return this.http.get("http://localhost:4000/post/getdeactiveposts");
  }

  getUsers(){
    return this.http.get("http://localhost:4000/user/getusers");
  }

  

}
