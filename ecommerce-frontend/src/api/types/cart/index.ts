import { ProductType } from '../product';

export type CartType = {
  id: number;
  subtotal: number;
  tax: number;
  total: number;
  products: CartProductWithIdType[];
};

export const defaultCart: CartType = {
  id: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  products: [],
};

export type CartProductType = {
  price: number;
  quantity: number;
};

export type CartProductWithIdType = {
  id: number;
  price: number;
  quantity: number;
  product: ProductType;
};

export type CartProductWithProductIdDtoType = {
  price: number;
  quantity: number;
  productId: number;
};
