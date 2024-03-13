import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  category: string = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params["category"];
    const category = this.productService.categories.find(item => item.name === this.category);
    if (category) {
      this.products = category.products;
    } else {
      console.error(`Category '${this.category}' not found.`);
      // Handle the case where the category is not found
      // For example, you could redirect to an error page or display a message to the user
    }
  }

  goToRealPage(i: number) {
    this.router.navigate([`products/${this.category}/${i}`]);
  }

  removeProduct(i: number) {
    // Remove the product from the products array
    this.products.splice(i, 1);
    // Update the products array in the productService.categories
    const categoryIndex = this.productService.categories.findIndex(item => item.name === this.category);
    if (categoryIndex !== -1) {
      this.productService.categories[categoryIndex].products = this.products;
    } else {
      console.error(`Category '${this.category}' not found.`);
      // Handle the case where the category is not found in the productService.categories array
    }
  }
}

