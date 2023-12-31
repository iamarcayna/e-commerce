import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem, Cart } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor() {
    const item = localStorage.getItem("cart");

    if (item) {
      this.cart = new BehaviorSubject<Cart>({
        items: [...JSON.parse(item)],
      });
    }
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    localStorage.setItem("cart", JSON.stringify(items));
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  emptyCart(): void {
    this.cart.next({ items: [] });
    localStorage.setItem("cart", JSON.stringify([]));
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: filteredItems });
    localStorage.setItem("cart", JSON.stringify(filteredItems));
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    const filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) _item.quantity--;
      if (_item.quantity === 0) {
        itemForRemoval = _item;
      }
      return _item;
    });

    this.cart.next({ items: filteredItems });
    localStorage.setItem("cart", JSON.stringify(filteredItems));
    if (itemForRemoval) {
      this.removeFromCart(itemForRemoval);
    }
  }
}
