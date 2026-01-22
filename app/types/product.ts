export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: string | number;
  title?: string;
  name?: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number | Rating;
}
