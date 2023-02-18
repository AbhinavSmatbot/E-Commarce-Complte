import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string = '';
  userName:string = '';
  searchResult: undefined | product[];
  cartItems =0;
  constructor(private roter: Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.roter.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          let sellerName1 = localStorage.getItem('seller');
          let sellerData = sellerName1 && JSON.parse(sellerName1);
          this.sellerName = sellerData.name;
          console.log('-----',sellerData);
          this.menuType = 'seller';
        }else if(localStorage.getItem('user')){
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          console.log('-----',userData);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id)
        }else {
          this.menuType = 'default';
        }
        // console.log(res.url);
      }
    })
    let cartData = localStorage.getItem('localCart');
    console.log('cartData',cartData);
    if(cartData){
      console.log('cartData',cartData);
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((res)=>{
      console.log('res',res);
      this.cartItems = res.length;
    })
  }

  logOut(){
    localStorage.removeItem('seller');
    this.roter.navigate(['/']);
    this.productService.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
   if(query){
    const element = query.target as HTMLInputElement;
    // console.log('query',element.value);
    this.productService.searchProducts(element.value).subscribe((res)=>{
    //  console.log('res',res);
     if(res.length>5){
      res.length = length;
     }
     this.searchResult = res;
    })
   }
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  submitSearch(val:string){
    this.roter.navigate([`search/${val}`]);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.roter.navigate(['/user-auth']);
  }

}
