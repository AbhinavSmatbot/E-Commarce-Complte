import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderData: order[] | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelorder(orderId: number | undefined) {
    if (orderId) {
      this.productService.cancelOrder(orderId).subscribe((res) => {
        if (res) {
          this.getOrderList();
        }
      })
    }

  }

  getOrderList() {
    this.productService.orderList().subscribe((res) => {
      this.orderData = res;
      console.log('orderData',res);
    })
  }

}
