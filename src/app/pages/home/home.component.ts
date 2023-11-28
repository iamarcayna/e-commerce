import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ScrollService } from "src/app/services/scroll.service";
import { StoreService } from "src/app/services/store.service";

interface SectionStatus {
  intersecting: boolean;
  url: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  private storeService = inject(StoreService);
  private scrollService = inject(ScrollService);

  categories!: Array<string>;
  subscriptions: Array<Subscription> = [];
  activeCategory!: string;
  sections!: Array<SectionStatus>;

  ngOnInit(): void {
    this.subscriptions.push(
      this.storeService.getAllCategories().subscribe((_categories) => {
        this.categories = _categories;
        this.sections = _categories.map((category) => {
          let curStatus = false;
          if (this.activeCategory === category) {
            curStatus = true;
          }
          return {
            url: category.replace(" ", "_").replace("'", "").toLowerCase(),
            intersecting: curStatus,
          };
        });
        this.sections.push({ url: "hero", intersecting: true });
      })
    );

    this.subscriptions.push(
      this.scrollService.activeSection.subscribe((section) => {
        this.activeCategory = section;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }

  onIntersect(intersecting: boolean, curSection: string) {
    if (this.sections) {
      this.sections?.map((section: SectionStatus) => {
        if (section.url === curSection) {
          section.intersecting = intersecting;
        }
        return section;
      });
      const activeSection = this.hasOneIntersection(this.sections);
      if (activeSection) {
        this.scrollService.activeSection.next(activeSection);
      }
    }
  }

  private hasOneIntersection(sections: Array<SectionStatus>): string | null {
    const intersect: Array<string> = [];
    sections.map((section: SectionStatus) => {
      if (section.intersecting) {
        intersect.push(section.url);
      }
      return section;
    });

    return intersect.length === 1 ? intersect[0] : null;
  }

  scrollIntoView(section: string) {
    this.scrollService.scrollIntoView(section);
  }
}
