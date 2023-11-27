import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  showModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
