import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ScrollService } from "src/app/services/scroll.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-vertical-navigation",
  templateUrl: "./vertical-navigation.component.html",
})
export class VerticalNavigationComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private storeService = inject(StoreService);

  @Output() close = new EventEmitter<any>();
  categories!: Array<string>;
  activeSection!: Observable<string>;
  categorySubscription!: Subscription;

  ngOnInit(): void {
    this.activeSection = this.scrollService.activeSection;
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
    this.close.emit();
  }
}
