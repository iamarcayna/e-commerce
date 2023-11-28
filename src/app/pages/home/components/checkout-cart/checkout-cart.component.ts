import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-checkout-cart",
  templateUrl: "./checkout-cart.component.html",
})
export class CheckoutCartComponent implements OnInit {
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      method: new FormControl("card"),
      name: new FormControl("", [Validators.required]),
      card_1: new FormControl(null, [
        Validators.required,
        Validators.min(4),
        Validators.maxLength(4),
      ]),
      card_2: new FormControl(null, [
        Validators.required,
        Validators.min(4),
        Validators.maxLength(4),
      ]),
      card_3: new FormControl(null, [
        Validators.required,
        Validators.min(4),
        Validators.maxLength(4),
      ]),
      card_4: new FormControl(null, [
        Validators.required,
        Validators.min(4),
        Validators.maxLength(4),
      ]),
      expire: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.maxLength(3),
      ]),
    });
  }

  onCheckOut() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    }
  }
}
