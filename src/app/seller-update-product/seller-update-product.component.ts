import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  constructor(private route:ActivatedRoute, private _productservice:ProductService,private toastr:ToastrService, private router:Router)
   { }

  ngOnInit(): void {
    let productId  = this.route.snapshot.paramMap.get('id');
    console.log('id',productId)
    productId && this._productservice.getProduct(productId).subscribe((res)=>{
    console.log('data',res);
    this.productData = res;
    })
  }
  submit(data:any){
  console.log('updatre',data);
  if(this.productData){
   data.id = this.productData.id;
   console.log('updatre',data);
  }
  this._productservice.updateProduct(data).subscribe((res)=>{
    console.log('updeted',res);
    if(res){
      this.toastr.success('Product update sucessfully');
      setTimeout(() => {
        this.router.navigate(['seller-home'])
      }, 3000);
    }
  })
  }
  
}
