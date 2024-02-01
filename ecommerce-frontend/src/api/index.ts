import axios from 'axios';
import { CategoryType, ProductType, ProductWithCategoryIdType } from './types';
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

export async function retrieveProduct(id: string) {
  const { data } = await axios.get<ProductType>(`/products/${id}`);
  return data;
}

export async function createProduct(body: ProductWithCategoryIdType) {
  try {
    await axios.post('/products', body);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function modifyProduct(
  id: string,
  body: ProductWithCategoryIdType
) {
  try {
    await axios.put(`/products/${id}`, body);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string) {
  await axios.delete(`/products/${id}`);
  return;
}
