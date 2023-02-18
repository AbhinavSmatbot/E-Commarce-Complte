import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router,private toast:ToastrService) { }
  userSignup(data:signUp){
  return this.http.post(`http://localhost:3000/users`,data,{observe:'response'})
  .subscribe((res)=>{
    console.log('res',res);
    if(res){
      localStorage.setItem('user',JSON.stringify(res.body));
      this.router.navigate(['/']);
    }
  });
  }

  userLogin(data:login){
    return this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((res)=>{
      console.log('res',res);
      if(res && res.body && res.body.length>0){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false);
      }else{
        this.toast.error('Something Went Wrong Please try again later');
        this.invalidUserAuth.emit(true);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
