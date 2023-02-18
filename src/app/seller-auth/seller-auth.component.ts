import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
  
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError:string ='';
  constructor(private _sellerService:SellerService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this._sellerService.reloadSeller();
  }
  signUp(data:signUp):void{
    console.log('signup data',data);
    if(data.name.length>0 && data.email.length>0 && data.password.length>0){
      this._sellerService.userSignUP(data);
      this.toastr.success("thankyou for signup");
      // .subscribe((response)=>{
      //   console.log('response',response);
      //   if(response){
      //     this.router.navigate(['seller-home']);
      //   }
      // })
    }else{
      this.toastr.error("Pleasse fill all Details");
    // console.log('signup data',data);
    }
  }

  login(data:signUp):void{
    console.log('login data',data);
    if(data.email.length>0 && data.password.length>0){
      this._sellerService.userLogin(data);
      // this.toastr.success("thankyou for login");
      this._sellerService.isLoginError.subscribe((res)=>{
        if(res){
          this.authError = 'Email or Password is not Correct';
          this.toastr.error('Something went wrong plaese try again later');
        }
      })
    
    }else{
      this.toastr.error("Pleasse fill all Details");
    // console.log('signup data',data);
    }
  }

  openLogin(){
    this.showLogin = true;
  }
  openSignup(){
    this.showLogin = false;
  }


  


}
