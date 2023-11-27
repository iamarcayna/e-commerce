import { Component, Input, OnInit, inject } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  private storeService = inject(StoreService);

  @Input("category") category!: string;

  products!: Array<Product>;

  ngOnInit(): void {
    console.log(this.category);
    this.storeService
      .getProducts(
        this.category.replace("_", " ").replace("", "").toLowerCase()
      )
      .subscribe((products) => {
        this.products = products;
      });
  }
}
