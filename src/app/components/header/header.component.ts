import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Observable } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { ScrollService } from "src/app/services/scroll.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  private cartService = inject(CartService);
  private storeService = inject(StoreService);
  private scrollService = inject(ScrollService);

  @Output() toggle = new EventEmitter<any>();

  cart!: Cart;
  itemsQuantity = 0;
  categories!: Array<string>;
  activeSection!: Observable<string>;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
    this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.itemsQuantity = _cart.items
        .map((item) => item.quantity)
        .reduce((prev, cur) => prev + cur, 0);
    });
  }

  toggleDrawer() {
    this.toggle.emit();
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
