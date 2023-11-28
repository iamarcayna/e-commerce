import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";
import { ScrollService } from "src/app/services/scroll.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  private storeService = inject(StoreService);
  private scrollService = inject(ScrollService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);

  @Input("category") category!: string;

  products!: Array<Product>;
  loading: boolean = false;
  subscriptions: Array<Subscription> = [];
  searchParam!: string;
  allProducts: Array<Product> = [];
  cart: Array<number> = [];

  ngOnInit(): void {
    if (this.category === "search") {
      this.subscriptions.push(
        this.storeService.getAllProducts().subscribe((products) => {
          this.allProducts = products;
          this.activatedRoute.queryParams.subscribe((param) => {
            if (param["search"]) {
              this.searchParam = param["search"];
              this.products = this.allProducts.filter((product) => {
                return (
                  product.description
                    .toLowerCase()
                    .includes(this.searchParam.toLowerCase()) ||
                  product.title
                    .toLowerCase()
                    .includes(this.searchParam.toLowerCase())
                );
              });
              this.scrollService.scrollIntoView("search");
            } else {
              this.searchParam = "";
            }
            this.productOnCart();
          });
        })
      );
    } else {
      this.loading = true;
      this.storeService
        .getProducts(
          this.category.replace("_", " ").replace("", "").toLowerCase()
        )
        .subscribe((products) => {
          this.products = products;
          this.productOnCart();
          this.loading = false;
        });
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }

  private productOnCart() {
    this.subscriptions.push(
      this.cartService.cart.subscribe((_cart) => {
        this.cart = _cart.items.map((item) => {
          return item.id;
        });
        this.products.map((product) => {
          if (this.cart.indexOf(product.id) !== -1) {
            product.onCart = true;
          }
          return product;
        });
      })
    );
  }
}
