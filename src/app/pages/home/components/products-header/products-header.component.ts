import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  sortBy = "Desc";
  itemShowCount = 12;
  @Output() productViewChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSortBy: string): void {
    this.sortBy = newSortBy;
  }

  onShowCountUpdated(newCount: number): void {
    this.itemShowCount = newCount;
  }

  onProductViewUpdated(columnCount: number): void {
    this.productViewChanged.emit(columnCount);
  }
}
