import axios from 'axios';
import { CategoryType, ProductType } from './types';
axios.defaults.baseURL = 'http://localhost:8080/api';

export async function retrieveAllCategories() {
  const { data } = await axios.get<CategoryType[]>('/categories');
  return data;
}

export async function retrieveAllProducts(category: string | null) {
  const endpoint = `/products${category ? `?category=${category}` : ''}`;
  const { data } = await axios.get<ProductType[]>(endpoint);
  return data;
}
