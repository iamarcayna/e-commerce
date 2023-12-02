import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-product-more-detail",
  templateUrl: "./product-more-detail.component.html",
})
export class ProductMoreDetailComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);

  product!: Product;
  subscription!: Subscription;
  loading: boolean = true;

  ngOnInit(): void {
    this.subscription = this.modalService.showModal.subscribe((product) => {
      if (product) {
        this.product = product;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeModal() {
    this.modalService.showModal.next(null);
  }

  onLoad() {
    this.loading = false;
  }
}
