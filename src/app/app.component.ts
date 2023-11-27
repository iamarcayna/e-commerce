import { Component, HostListener, OnInit, inject } from "@angular/core";
import { ModalService } from "./services/modal.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private modalService = inject(ModalService);
  open: boolean = false;
  showModal!: boolean;
  modalSubscription!: Subscription;

  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    // tailwind md:screen is 768px
    if ((event.target as Window).innerWidth >= 768) {
      this.open = false;
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.add("overflow-y-auto");
    }
  }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.showModal.subscribe((show) => {
      this.showModal = show;
      if (show) {
        document.body.classList.remove("overflow-y-auto");
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
        document.body.classList.add("overflow-y-auto");
      }
    });
  }

  drawerOpen() {
    this.showModal = false;
    this.open = true;
    document.body.classList.remove("overflow-y-auto");
    document.body.classList.add("overflow-y-hidden");
  }

  drawerClose() {
    this.open = false;
    document.body.classList.remove("overflow-y-hidden");
    document.body.classList.add("overflow-y-auto");
  }
}
