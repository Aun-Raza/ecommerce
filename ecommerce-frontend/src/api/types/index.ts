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
