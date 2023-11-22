import { Component, HostListener, OnInit, inject } from "@angular/core";
import { Cart } from "./models/cart.model";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private cartService = inject(CartService);
  cart: Cart = { items: [] };
  open: boolean = false;

  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    // tailwind md:screen is 768px
    if ((event.target as Window).innerWidth >= 768) {
      this.open = false;
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.add("overflow-y-auto");
    }
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
  drawerOpen() {
    this.open = true;
    document.body.classList.remove("overflow-y-auto");
    document.body.classList.add("overflow-y-hidden");
  }

  drawerClose() {
    this.open = false;
    document.body.classList.remove("overflow-y-hidden");
    document.body.classList.add("overflow-y-auto");
  }
}
