export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface Cart {
  items: Array<CartItem>;
}
