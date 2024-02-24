import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserCredentialsType,
  defaultUserCredentials,
} from '../../../api/types/auth';
import { login, register } from '../../../api/auth-api';
import { useAuthContext } from '../../../context/AuthContext';
import apiClient from '../../../api/apiClient';
import { Input, Button } from '@nextui-org/react';

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
        authContext.setUser({
          username: credential.username,
          isAuthenticated: true,
        });
        localStorage.setItem('token', `Bearer ${accessToken}`);
        history.push('/');
      }
    } else {
      if (await register(credential)) {
        history.push('/login');
      }
    }
  }

  return (
    <>
      <h1>
        {type === 'login' ? 'Enter Your Credentials' : 'Create An Account'}
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          id='username'
          name='username'
          label='Username'
          value={credential.username}
          onChange={({ target: { name, value } }) =>
            setCredential((c) => ({ ...c, [name]: value }))
          }
          type='text'
        />
        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          value={credential.password}
          onChange={({ target: { name, value } }) =>
            setCredential((c) => ({ ...c, [name]: value }))
          }
        />
        <span className='block'>
          {type === 'login'
            ? 'Do not have an account?'
            : 'Already have an account?'}
          <Button
            className='ms-2'
            variant='faded'
            onClick={() => {
              history.push(type === 'login' ? '/register' : '/login');
            }}
          >
            {type === 'login' ? 'Register here' : 'Login here'}
          </Button>
        </span>
        <Button color='primary' type='submit' className='w-full'>
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
