export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: ProductRating;
  onCart: boolean;
}

export interface ProductRating {
  rate: number;
  count: number;
}
