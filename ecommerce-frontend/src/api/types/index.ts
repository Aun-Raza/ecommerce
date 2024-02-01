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

export const defaultProductWithCategoryId: ProductWithCategoryIdType = {
  product: {
    name: '',
    description: '',
    price: 10.0,
  },
  categoryId: 0,
};
