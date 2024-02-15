import { ProductType } from '../product';

export type OrderType = {
  id: number;
  subtotal: number;
  tax: number;
  total: number;
  products: OrderProductWithIdType[];
};

export type OrderProductWithIdType = {
  id: number;
  price: number;
  quantity: number;
  product: ProductType;
};
