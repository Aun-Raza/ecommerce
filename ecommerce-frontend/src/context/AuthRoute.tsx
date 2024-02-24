import { PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';
import { isTokenExpired } from '../util/func';

const AuthRoute = ({ children }: PropsWithChildren) => {
  const history = useHistory();
  const token = localStorage.getItem('token') as string;
  if (!isTokenExpired(token)) {
    return <>{children}</>;
  } else {
    localStorage.setItem('token', '');
    history.push('/login');
    return null;
  }
};

export default AuthRoute;
