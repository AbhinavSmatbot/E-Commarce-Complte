import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  icon = faTrash;
  iconEdit = faEdit;
  productList: undefined | product[];
  productMessage: undefined | string;
  constructor(private _productService: ProductService, private _toaster: ToastrService) { }

  ngOnInit(): void {
    this.listProduct();
  }

  deleteProducts(id: number) {
    this._productService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product is deleted';
        this._toaster.success('Product deleted sucessfully')
        this.listProduct();
      } else {
        this._toaster.error('Something Went Wrong please try again later')
      }
      setTimeout(() => {
        this.productMessage = '';
      }, 3000);
    })
  }

  listProduct() {
    this._productService.productList().subscribe((res) => {
      // console.log('ressssss', res)
      if (res) {
        this.productList = res;
        
      }
    })
  }

}
