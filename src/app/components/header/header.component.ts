import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Cart } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { ScrollService } from "src/app/services/scroll.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private storeService = inject(StoreService);
  private scrollService = inject(ScrollService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Output() toggle = new EventEmitter<any>();

  cart!: Cart;
  itemsQuantity = 0;
  categories!: Array<string>;
  activeSection!: Observable<string>;
  categorySubscription!: Subscription;
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.itemsQuantity = _cart.items
        .map((item) => item.quantity)
        .reduce((prev, cur) => prev + cur, 0);
    });
    this.searchForm = new FormGroup({
      search: new FormControl(""),
    });
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param["search"]) {
        this.searchForm.get("search")?.patchValue(param["search"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  toggleDrawer() {
    this.toggle.emit();
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }

  onSearch() {
    if (this.searchForm.get("search")?.value.trim() !== "") {
      this.router.navigate(["/home"], { queryParams: this.searchForm.value });
    }
  }

  onKeyUp() {
    if (this.searchForm.get("search")?.value.trim() === "") {
      this.router.navigate(["/home"], {
        queryParams: { search: null },
        queryParamsHandling: "merge",
      });
    }
  }
}
