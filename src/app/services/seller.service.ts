import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  isSellerLoggedIn:boolean = false;
  sellerUrl:string = `http://localhost:3000/seller`;

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService) { }
  userSignUP(data:signUp){
    console.log("service clalled",data);
    return this.http.post(this.sellerUrl, data).subscribe((result)=>{
      if(result){
        // this.isSellerLoggedIn.next(true);
        this.isSellerLoggedIn = true;
        localStorage.setItem('seller',JSON.stringify(result));
        this.router.navigate(['seller-home']);
      }
    })
  
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      // this.isSellerLoggedIn.next(true);
      this.isSellerLoggedIn = true;
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:login){
   console.log('login data Service',data);
   return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((response:any)=>{
    console.log('login result',response);
    if(response && response.body && response.body.length>0){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(response.body));
      this.router.navigate(['seller-home']);
    }else{
      this.isLoginError.emit(true)
      this.toastr.error('Something went wrong plaese try again later');
    }
   })
  }
}
