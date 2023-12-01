import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { ScrollService } from "src/app/services/scroll.service";
import { SnackbarService } from "src/app/services/snack.service";

@Component({
  selector: "app-checkout-cart",
  templateUrl: "./checkout-cart.component.html",
})
export class CheckoutCartComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private scrollService = inject(ScrollService);
  private router = inject(Router);
  private snackBarService = inject(SnackbarService);

  checkoutForm!: FormGroup;
  subscription!: Subscription;
  cart!: Cart;
  total: number = 0;
  sendingMessage: boolean = false;

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      method: new FormControl("card"),
      name: new FormControl("", [Validators.required]),
      card_1: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
      card_2: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
      card_3: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
      card_4: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
      expire_month: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern("^(1[0-2]|[1-9])$"),
      ]),
      expire_year: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^(200[1-9]|20[1-4][0-9]|2050)$"),
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern("^[0-9]*$"),
      ]),
    });
    this.subscription = this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.total = +this.cartService.getTotal(cart.items).toFixed(2);
    });

    this.scrollService.activeSection.next("hero");
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCheckOut() {
    if (this.checkoutForm.valid && this.cart.items.length !== 0) {
      this.sendingMessage = true;
      setTimeout(() => {
        this.checkoutForm.reset({ method: "card" });
        this.cartService.emptyCart();
        this.snackBarService.showSnackbar({
          message: "Thank you. Your purchase was successful.",
          duration: 5_000,
        });
        this.sendingMessage = false;
      }, 3_000);
    }
  }
  addQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }
  removeQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }
  removeToCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  goShopping() {
    this.router.navigate(["home"], {
      queryParams: { sec: "electronics" },
      queryParamsHandling: "merge",
    });
  }
}
