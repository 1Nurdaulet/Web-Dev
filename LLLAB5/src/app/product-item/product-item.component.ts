import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  public product: any = {}
  categoryName: string = ""
  productId: number = 0

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryName = this.activatedRoute.snapshot.params["category"];
    this.productId = this.activatedRoute.snapshot.params["productId"]
    const category = this.productService.categories.find(item => item.name === this.categoryName);
if (category) {
    this.product = category.products[this.productId];
}

  }

  changeCurrentImg(image: string) {
    this.product.currectImg = image
  }

  shareWithTelegram() {
    document.location.href = "https://t.me/share/url?url=" + this.product.realPage
  }
}
