import { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';

const AuthRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuthContext();
  if (user.isAuthenticated) {
    return <>{children}</>;
  } else return <Redirect to={'/login'} />;
};

export default AuthRoute;
