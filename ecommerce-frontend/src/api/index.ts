import axios from 'axios';
import { CategoryType, ProductType, ProductWithCategoryIdType } from './types';
axios.defaults.baseURL = 'http://localhost:8080/api';
const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdW4iLCJpYXQiOjE3MDczMjY5NTAsImV4cCI6MTcwNzMyNzY1MH0.FpTsSjj69w7ytheF8fubCeDN3Rq7onQI1TjyChKuzfaJYgLugVO2zaRLQtGe6F00EwQ8Cr9XfjG-ZNWUwgL0kA';

export async function retrieveAllCategories() {
  const { data } = await axios.get<CategoryType[]>('/categories', {
    headers: { Authorization: 'Bearer ' + token },
  });
  return data;
}

export async function retrieveAllProducts(category: string | null) {
  const endpoint = `/products${category ? `?category=${category}` : ''}`;
  const { data } = await axios.get<ProductType[]>(endpoint, {
    headers: { Authorization: 'Bearer ' + token },
  });
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
