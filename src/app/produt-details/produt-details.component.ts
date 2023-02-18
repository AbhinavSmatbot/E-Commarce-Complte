import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { product, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-produt-details',
  templateUrl: './produt-details.component.html',
  styleUrls: ['./produt-details.component.css']
})
export class ProdutDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData:product|undefined; 
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProduct(productId).subscribe((res) => {
        console.log('ww', res);
        this.productData = res;
        let cartItem = localStorage.getItem('localCart');
        console.log('fdfdfdfdfdfdfd',cartItem)
        if (productId && cartItem) {
          let items = JSON.parse(cartItem);
          items = items.filter((item: product) => productId === item.id.toString());
          console.log('itesfsdfdfdsf', items);
          if (items.length > 0) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }

        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);

          this.productService.cartData.subscribe((res) => {
            let item = res.filter((item: product) => productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.removeCart = true;
            }
          })
        }
      })
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity = this.productQuantity + 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = this.productQuantity - 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddtoCart(this.productData);
        this.removeCart = true;
      } else {
        console.log('user is logged in');
        let user = localStorage.getItem('user');
        console.log('usre', user)
        let userId = user && JSON.parse(user)[0].id;
        console.log('usrid', userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.productService.getCartList(userId);
            this.removeCart = true;
            this.toastr.success("Product added in cart sucessfully")
          }
        })
        console.log('adawdadad', cartData);
      }
      console.log('product', this.productData)
    }

  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFormCart(productId);
      this.removeCart = false;
    }else{
     this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((res)=>{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      this.productService.getCartList(userId);
     })
    }
    this.removeCart = false;
  }

}
