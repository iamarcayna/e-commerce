import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  private cartService = inject(CartService);
  private storeService = inject(StoreService);

  @Output() toggle = new EventEmitter<any>();

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  categories!: Array<string>;
  categorySubscription!: Subscription;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, cur) => prev + cur, 0);
  }

  ngOnInit(): void {
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onEmptyCart(): void {
    this.cartService.emptyCart();
  }

  toggleDrawer() {
    this.toggle.emit();
  }
}
