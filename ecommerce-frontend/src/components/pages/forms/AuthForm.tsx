import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserCredentialsType,
  defaultUserCredentials,
} from '../../../api/types';
import { login, register } from '../../../api/auth-api';

type AuthFormType = {
  type: string;
};

const AuthForm = ({ type }: AuthFormType) => {
  const history = useHistory();
  const [credential, setCredential] = useState<UserCredentialsType>(
    defaultUserCredentials
  );

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (type === 'login') {
      const authResponse = await login(credential);
      if (!authResponse) {
        console.log('Login credential is invalid');
      } else {
        console.log(authResponse);
      }
    } else {
      if (await register(credential)) {
        history.push('/');
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
