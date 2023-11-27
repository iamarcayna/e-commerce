import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ScrollService } from "src/app/services/scroll.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-vertical-navigation",
  templateUrl: "./vertical-navigation.component.html",
})
export class VerticalNavigationComponent implements OnInit {
  private scrollService = inject(ScrollService);
  private storeService = inject(StoreService);

  @Output() close = new EventEmitter<any>();
  categories!: Array<string>;
  activeSection!: Observable<string>;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
    this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
    this.close.emit();
  }
}
