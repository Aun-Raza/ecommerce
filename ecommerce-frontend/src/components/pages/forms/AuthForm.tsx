import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserCredentialsType,
  defaultUserCredentials,
} from '../../../api/types';
import { login, register } from '../../../api/auth-api';
import { useAuthContext } from '../../../context/AuthContext';
import apiClient from '../../../api/apiClient';

type AuthFormType = {
  type: string;
};

const AuthForm = ({ type }: AuthFormType) => {
  const [credential, setCredential] = useState<UserCredentialsType>(
    defaultUserCredentials
  );
  const history = useHistory();
  const authContext = useAuthContext();

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (type === 'login') {
      const authResponse = await login(credential);
      if (!authResponse) {
        console.log('Login credential is invalid');
        return;
      }
      const { accessToken } = authResponse;
      if (accessToken) {
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        });
        authContext.setUser({
          username: credential.username,
          isAuthenticated: true,
          token: `Bearer ${accessToken}`,
        });
        localStorage.setItem('token', accessToken);
        history.push('/');
      }
    } else {
      if (await register(credential)) {
        history.push('/login');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-2 p-3 border'>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <fieldset>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          value={credential.username}
          onChange={({ target: { name, value } }) =>
            setCredential((c) => ({ ...c, [name]: value }))
          }
          type='text'
        />
      </fieldset>
      <fieldset>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={credential.password}
          onChange={({ target: { name, value } }) =>
            setCredential((c) => ({ ...c, [name]: value }))
          }
        />
      </fieldset>
      <span
        className='block cursor-pointer'
        onClick={() => {
          history.push(type === 'login' ? '/register' : '/');
        }}
      >
        {type === 'login'
          ? 'Do not have an account? Register here '
          : 'Already have an account? Login here'}
      </span>
      <button type='submit' className='primary w-full mt-2'>
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
