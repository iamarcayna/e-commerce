export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  id: number;
  image: string;
}

export interface Cart {
  items: Array<CartItem>;
}
