import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   productDetails:undefined | product[];
   trendyProducts:undefined | product[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductDetails();
    this.getTrendyProductDetails();
  }
  getProductDetails(){
    this.productService.papularProduct().subscribe((res)=>{
    this.productDetails = res;
    // console.log('table',res);
    })
  }

  getTrendyProductDetails(){
    this.productService.trandyProduct().subscribe((res)=>{
      this.trendyProducts = res;
    })
  }

}
