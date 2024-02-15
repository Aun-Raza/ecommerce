import { CategoryType } from '../category';

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
};

export type ProductWithCategoryIdType = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

export const defaultProductWithCategoryId: ProductWithCategoryIdType = {
  name: '',
  description: '',
  price: 10.0,
  categoryId: 0,
};
