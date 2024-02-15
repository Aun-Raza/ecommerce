import apiClient, { auth } from './apiClient';
import { OrderType } from './types/order';

export async function retrieveAllOrders(token: string) {
  try {
    const { data } = await apiClient.get<OrderType[]>('/orders', auth(token));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveOrder(orderId: string, token: string) {
  try {
    const { data } = await apiClient.get<OrderType>(
      `/orders/${orderId}`,
      auth(token)
    );
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}
