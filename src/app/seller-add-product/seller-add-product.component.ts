import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor( private _productService:ProductService, private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  submit(data:product){
   console.log('new sss',data);
   if(data.name.length>0 && data.category.length>0 && data.color.length>0){
    this._productService.addProduct(data).subscribe((res)=>{
      console.log('res',res);
      if(res){
        this.toast.success('Product is added sucessfully');
        this.router.navigate(['seller-home']);
      }
     })
   }else{
    this.toast.error('Please fill all details');
   }
  }

}
