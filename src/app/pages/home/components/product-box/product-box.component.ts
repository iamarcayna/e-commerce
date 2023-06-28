import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent {
  @Output() addToCart = new EventEmitter();
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
