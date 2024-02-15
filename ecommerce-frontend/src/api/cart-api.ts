import apiClient, { auth } from './apiClient';
import { CartProductWithProductIdDtoType, CartType } from './types/cart';

export async function retrieveCartProducts(token: string) {
  try {
    const { data } = await apiClient.get<CartType>('/cart', auth(token));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCartProduct(
  body: CartProductWithProductIdDtoType,
  token: string
) {
  try {
    const { data } = await apiClient.post<CartType>('/cart', body, auth(token));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function checkoutCart(token: string) {
  try {
    const { data } = await apiClient.get<CartType>(
      '/cart/checkout',
      auth(token)
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
