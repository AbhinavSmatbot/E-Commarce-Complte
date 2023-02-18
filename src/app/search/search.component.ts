import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    if (query) {
      this.productService.searchProducts(query).subscribe((res) => {
        this.searchResult = res;
      })
    }
  }

}
