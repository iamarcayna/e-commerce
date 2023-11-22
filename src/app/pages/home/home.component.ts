import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, map } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  private storeService = inject(StoreService);

  categories!: Array<string>;
  categorySubscription!: Subscription;

  ngOnInit(): void {
    this.categorySubscription = this.storeService
      .getAllCategories()
      .pipe(
        map((category) => {
          return category.map((item) =>
            item.replace(" ", "_").replace("'", "").toLowerCase()
          );
        })
      )
      .subscribe((_categories) => (this.categories = _categories));
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }
}
