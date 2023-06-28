import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent {
  @Output() sortChanged = new EventEmitter<string>();
  @Output() showCountChanged = new EventEmitter<number>();
  @Output() productViewChanged = new EventEmitter<number>();
  sortBy = "Desc";
  itemShowCount = 12;
  constructor() {}

  onSortUpdated(newSortBy: string): void {
    this.sortChanged.emit(newSortBy);
    this.sortBy = newSortBy;
  }

  onShowCountUpdated(newCount: number): void {
    this.showCountChanged.emit(newCount);
    this.itemShowCount = newCount;
  }

  onProductViewUpdated(columnCount: number): void {
    this.productViewChanged.emit(columnCount);
  }
}
