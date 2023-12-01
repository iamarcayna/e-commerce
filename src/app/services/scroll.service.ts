import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  private router = inject(Router);

  activeSection: BehaviorSubject<string> = new BehaviorSubject("hero");

  scrollIntoView(section: string) {
    const sec = section.replace(" ", "_").replace("'", "").toLowerCase();
    const sectionToScroll = document.getElementById(sec);

    if (this.router.url.slice(1, 5) !== "home") {
      this.router.navigate(["/home"], {
        queryParams: { sec: sec },
        queryParamsHandling: "merge",
      });
    } else {
      sectionToScroll?.scrollIntoView({ behavior: "smooth" });
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
