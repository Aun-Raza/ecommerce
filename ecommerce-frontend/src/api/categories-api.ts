import apiClient from './apiClient';
import { CategoryType } from './types/category';

export async function retrieveAllCategories() {
  const { data } = await apiClient.get<CategoryType[]>('/categories');
  return data;
}
