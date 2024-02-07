import apiClient from './apiClient';
import { AuthResponseType, UserCredentialsType } from './types';

export async function login(credential: UserCredentialsType) {
  try {
    console.log(credential);
    const { data } = await apiClient.post<AuthResponseType>(
      '/auth/login',
      credential
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function register(credential: UserCredentialsType) {
  try {
    await apiClient.post('/auth/register', credential);
    return true;
  } catch (error) {
    return null;
  }
}
