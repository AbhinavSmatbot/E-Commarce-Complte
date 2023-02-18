import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { cart, login, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private userService: UserService, private toast: ToastrService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: any) {
    this.userService.userSignup(data);
    this.toast.success('Succefully Login');
  }
  login(val: login) {
    console.log('val', val);
    this.userService.userLogin(val);
    this.userService.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = "User Not Found";
      } else {
        this.localCarttoRemoteCarrt();
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

  localCarttoRemoteCarrt() {
    console.warn('called');
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      
      cartDataList.forEach((product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('data store in data', res);
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      })
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
    
  }

}
