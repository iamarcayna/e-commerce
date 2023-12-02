import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  showModal: Subject<Product | null> = new Subject();
}
