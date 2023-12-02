import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { ModalService } from "./services/modal.service";
import { ContainerDirective } from "./directives/container.directive";
import { SnackbarService } from "./services/snack.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private modalService = inject(ModalService);
  private snackBarService = inject(SnackbarService);

  @ViewChild(ContainerDirective, { static: true })
  snackbarContainer!: ContainerDirective;

  open: boolean = false;
  showModal!: boolean;

  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    // tailwind md:screen is 768px
    if ((event.target as Window).innerWidth >= 768) {
      this.open = false;
      if (!this.showModal) {
        document.body.classList.remove("overflow-y-hidden");
        document.body.classList.add("overflow-y-scroll");
      }
    }
  }

  ngOnInit(): void {
    this.modalService.showModal.subscribe((product) => {
      this.showModal = product ? true : false;
      if (this.showModal) {
        document.body.classList.remove("overflow-y-scroll");
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
        document.body.classList.add("overflow-y-scroll");
      }
    });
    this.snackBarService.setContainer(this.snackbarContainer);
  }

  drawerOpen() {
    this.showModal = false;
    this.open = true;
    document.body.classList.remove("overflow-y-scroll");
    document.body.classList.add("overflow-y-hidden");
  }

  drawerClose() {
    this.open = false;
    document.body.classList.remove("overflow-y-hidden");
    document.body.classList.add("overflow-y-scroll");
  }
}
