export interface Product {
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
};

export type ProductMap = Record<string, Product[]>;
