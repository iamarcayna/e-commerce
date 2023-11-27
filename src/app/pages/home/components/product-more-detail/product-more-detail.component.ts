import { Component, inject } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-product-more-detail",
  templateUrl: "./product-more-detail.component.html",
})
export class ProductMoreDetailComponent {
  private modalService = inject(ModalService);

  closeModal() {
    this.modalService.showModal.next(false);
  }
}
