import { PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { isTokenExpired } from '../util/func';
import { defaultUser, useAuthContext } from './AuthContext';

const AuthRoute = ({ children }: PropsWithChildren) => {
  const { setUser } = useAuthContext();
  const token = localStorage.getItem('token') as string;
  if (!isTokenExpired(token)) {
    return <>{children}</>;
  } else {
    localStorage.setItem('token', '');
    setUser(defaultUser);
    return <Redirect to='/login' />;
  }
};

export default AuthRoute;
