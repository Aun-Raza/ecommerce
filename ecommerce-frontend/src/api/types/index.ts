export type CategoryType = {
  id: number;
  name: string;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
};

export type ProductWithCategoryIdType = {
  product: {
    name: string;
    description: string;
    price: number;
  };
  categoryId: number;
};

export type UserCredentialsType = {
  username: string;
  password: string;
};

export type AuthResponseType = {
  tokenType: string;
  accessToken: string;
};

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
};

export type CartProductWithProductIdType = {
  cartProduct: CartProductType;
  productId: number;
};

export const defaultProductWithCategoryId: ProductWithCategoryIdType = {
  product: {
    name: '',
    description: '',
    price: 10.0,
  },
  categoryId: 0,
};

export const defaultUserCredentials: UserCredentialsType = {
  username: '',
  password: '',
};
