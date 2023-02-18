import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  checkout(){
  this.router.navigate(['/checkout'])
  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((res)=>{
       this.loadData();
     })
  }
  loadData(){
    this.productService.currentCart().subscribe((res) => {
      this.cartData = res;
      console.log('allcartitem',res)
      let price = 0;
      res.forEach((item)=>{
        if(item.quantity){
          price = price+(+item.price * +item.quantity)
        }
        
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price+(price/10)+100-(price/10); 
    })
  }

}
