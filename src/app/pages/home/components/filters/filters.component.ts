import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() categoryChanged = new EventEmitter<string>();
  categories: Array<string> | undefined;
  categorySubscription: Subscription | undefined;
  defaultCategory = "All products";

  constructor(private storeService: StoreService) {}

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getCategories();
  }

  onCategoryUpdated(category: string): void {
    this.categoryChanged.emit(category);
  }

  getCategories(): void {
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe(
        (_categories) =>
          (this.categories = [this.defaultCategory, ..._categories])
      );
  }
}
