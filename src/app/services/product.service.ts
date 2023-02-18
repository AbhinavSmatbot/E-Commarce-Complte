import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  url: string = `http://localhost:3000/products`;
  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    console.log('service is called');
    return this.http.post(this.url, data);
  }
  productList() {
    return this.http.get<product[]>(this.url);
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product)
  }

  papularProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }

  trandyProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      console.log('set local ',localStorage.getItem('localCart'))
      this.cartData.emit(cartData);
      console.log('you already data ');
    }
  }

  removeItemFormCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let item: product[] = JSON.parse(cartData);
      item = item.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(item));
      this.cartData.emit(item);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>('https://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      })
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let userStorage = localStorage.getItem('user');
    console.log('user', userStorage);
    let userData = userStorage && JSON.parse(userStorage)[0];
    console.log('usersdssd', userData);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id)
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/order', data);
  }

  orderList() {
    let userStorage = localStorage.getItem('user');
    console.log('user', userStorage);
    let userData = userStorage && JSON.parse(userStorage)[0];
    console.log('usersdssd', userData);
    return this.http.get<order[]>('http://localhost:3000/cart?userId=' + userData.id)
  }

  deleteCartItem(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((res) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
  return this.http.delete('http://localhost:3000/order/'+orderId)
  }

}
