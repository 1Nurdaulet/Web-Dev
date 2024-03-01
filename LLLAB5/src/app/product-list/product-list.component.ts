import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = []
  category: string = ""

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params["category"]
    const category = this.productService.categories.find(item => item.name === this.category);
if (category) {
    this.products = category.products;
}
  }

  goToRealPage(i: number) {
    this.router.navigate([`products/${this.category}/${i}`])
  }

  removeProduct(i: number) {
    this.products = this.products.filter(item => {
      return item !== this.products[i]
    });
    const category = this.productService.categories.find(item => item.name === this.category);
if (category) {
    category.products = this.products;
}
  }
}
