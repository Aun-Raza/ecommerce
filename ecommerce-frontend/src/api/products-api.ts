import apiClient from './apiClient';
import { ProductType, ProductWithCategoryIdType } from './types';

export async function retrieveAllProducts(category: string | null) {
  const endpoint = `/products${category ? `?category=${category}` : ''}`;
  const { data } = await apiClient.get<ProductType[]>(endpoint);
  return data;
}

export async function retrieveProduct(id: string) {
  const { data } = await apiClient.get<ProductType>(`/products/${id}`);
  return data;
}

export async function createProduct(body: ProductWithCategoryIdType) {
  try {
    await apiClient.post('/products', body);
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
    await apiClient.put(`/products/${id}`, body);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string) {
  await apiClient.delete(`/products/${id}`);
  return;
}
