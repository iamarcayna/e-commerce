import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 450, 3: 385, 4: 400 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  viewColumns = 3;
  rowHeight = ROWS_HEIGHT[this.viewColumns];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "Desc";
  count = "12";
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort.toLowerCase(), this.category)
      .subscribe((_products) => (this.products = _products));
  }
  onProductViewChanged(columnCount: number): void {
    this.viewColumns = columnCount;
    this.rowHeight = ROWS_HEIGHT[this.viewColumns];
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onCategoryChanged(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onItemShowCountChanged(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortByChanged(sortBy: string): void {
    this.sort = sortBy;
    this.getProducts();
  }
}
