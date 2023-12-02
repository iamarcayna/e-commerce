import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  @Input("product") product!: Product;

  starRating: Array<boolean> = [];
  loading: boolean = true;
  subscriptions: Array<Subscription> = [];

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
    this.subscriptions.push(
      this.cartService.cart.subscribe((cart) => {
        const isItemOnCart = cart.items.find(
          (item) => item.id === this.product.id
        );
        if (isItemOnCart) {
          this.product.onCart = true;
        } else {
          this.product.onCart = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onAddToCart() {
    this.cartService.addToCart({
      name: this.product.title,
      price: this.product.price,
      quantity: 1,
      id: this.product.id,
      image: this.product.image,
    });
  }

  showMoreDetail() {
    this.modalService.showModal.next(this.product);
  }

  onLoad() {
    this.loading = false;
  }

  onViewCart() {
    this.router.navigate(["cart"]);
  }
}
