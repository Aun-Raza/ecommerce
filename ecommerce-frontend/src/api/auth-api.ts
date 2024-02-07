import axios from 'axios';
import { AuthResponseType, UserCredentialsType } from './types';
axios.defaults.baseURL = 'http://localhost:8080/api/auth';

export async function login(credential: UserCredentialsType) {
  try {
    console.log(credential);
    const { data } = await axios.post<AuthResponseType>('/login', credential, {
      headers: { Authorization: '' },
    });
    return data;
  } catch (error) {
    return null;
  }
}

export async function register(credential: UserCredentialsType) {
  try {
    await axios.post('/register', credential, {
      headers: { Authorization: '' },
    });
    return true;
  } catch (error) {
    return null;
  }
}
