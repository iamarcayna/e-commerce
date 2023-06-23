import { Component, OnInit } from "@angular/core";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  viewColumns = 3;
  rowHeight = ROWS_HEIGHT[this.viewColumns];
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onProductViewChanged(columnCount: number): void {
    this.viewColumns = columnCount;
    this.rowHeight = ROWS_HEIGHT[this.viewColumns];
  }

  onCategoryChanged(newCategory: string): void {
    this.category = newCategory;
  }
}
