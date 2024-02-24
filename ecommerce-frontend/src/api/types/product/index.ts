import { CategoryType } from '../category';

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryType;
};

export type ProductWithCategoryIdType = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export const defaultProductWithCategoryId: ProductWithCategoryIdType = {
  name: '',
  description: '',
  price: 10.0,
  imageUrl: '',
  categoryId: 0,
};
