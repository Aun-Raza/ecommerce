import { PropsWithChildren } from 'react';
import { defaultUser, useAuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token: string) {
  if (!token) return false;
  const { exp } = jwtDecode<{ exp: number }>(token);
  const now = Math.floor(Date.now() / 1000);
  if (exp > now) return true;
  localStorage.setItem('token', '');
  return false;
}

const AuthRoute = ({ children }: PropsWithChildren) => {
  const history = useHistory();
  const token = localStorage.getItem('token') as string;
  if (isTokenExpired(token)) {
    return <>{children}</>;
  } else {
    localStorage.setItem('token', '');
    history.push('/login');
    return null;
  }
};

export default AuthRoute;
