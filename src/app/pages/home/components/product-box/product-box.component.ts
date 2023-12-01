import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";
import { ScrollService } from "src/app/services/scroll.service";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  private storeService = inject(StoreService);
  private scrollService = inject(ScrollService);
  private activatedRoute = inject(ActivatedRoute);

  @Input("category") category!: string;
  @Output("loaded") loaded = new EventEmitter<string>();

  products!: Array<Product>;
  loading: boolean = false;
  subscriptions: Array<Subscription> = [];
  searchParam!: string;
  allProducts: Array<Product> = [];

  ngOnInit(): void {
    if (this.category === "search") {
      this.subscriptions.push(
        this.storeService.getAllProducts().subscribe((products) => {
          this.allProducts = products;
          this.activatedRoute.queryParams.subscribe((param) => {
            if (param["s"]) {
              this.searchParam = param["s"];
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
          });
        })
      );
    } else {
      this.loading = true;
      this.subscriptions.push(
        this.storeService
          .getProducts(
            this.category.replace("_", " ").replace("", "").toLowerCase()
          )
          .subscribe((products) => {
            this.products = products;
            this.loading = false;
            this.loaded.emit(this.category);
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
