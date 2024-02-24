import apiClient, { auth } from './apiClient';
import { ProductType, ProductWithCategoryIdType } from './types/product';

export async function retrieveAllProducts(category: string | null) {
  const endpoint = `/products${category ? `?category=${category}` : ''}`;
  const { data } = await apiClient.get<ProductType[]>(endpoint);
  return data;
}

export async function retrieveProduct(id: string) {
  const { data } = await apiClient.get<ProductType>(`/products/${id}`);
  return data;
}

export async function createProduct(formData: FormData, token: string) {
  try {
    await apiClient.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: token },
    });
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function modifyProduct(
  id: string,
  formData: FormData,
  token: string
) {
  try {
    await apiClient.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: token },
    });
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string, token: string) {
  await apiClient.delete(`/products/${id}`, auth(token));
  return;
}
