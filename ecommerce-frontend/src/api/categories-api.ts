import apiClient from './apiClient';
import { CategoryType } from './types';

export async function retrieveAllCategories() {
  const { data } = await apiClient.get<CategoryType[]>('/categories');
  return data;
}
