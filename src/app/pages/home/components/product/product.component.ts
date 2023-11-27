import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  private cartService = inject(CartService);
  private modalService = inject(ModalService);

  @Input("product") product!: Product;
  starRating: Array<boolean> = [];

  ngOnInit(): void {
    let rating =
      Math.round(
        this.product.rating.rate - Math.floor(this.product.rating.rate)
      ) + Math.floor(this.product.rating.rate);
    for (let i = 0; i < 5; i++) {
      if (rating > 0) {
        this.starRating.push(true);
      } else {
        this.starRating.push(false);
      }
      rating = rating - 1;
    }
  }

  onAddToCart() {
    this.cartService.addToCart({
      name: this.product.title,
      price: this.product.price,
      quantity: 1,
      id: this.product.id,
    });
  }

  showMoreDetail() {
    this.modalService.showModal.next(true);
  }
}
