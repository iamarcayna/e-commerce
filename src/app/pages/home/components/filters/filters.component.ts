import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  @Output() categoryChanged = new EventEmitter<string>();
  categories = ["Shoes", "Sports"];

  constructor() {}

  ngOnInit(): void {}

  onCategoryUpdated(category: string): void {
    this.categoryChanged.emit(category);
  }
}
