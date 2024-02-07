import { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';

interface UnprotectedRouteType {
  children: React.ReactElement<any, any>;
  isAuth: boolean;
}

const UnprotectedRoute = ({ isAuth, children }: UnprotectedRouteType) => {
  const { user } = useAuthContext();
  if (isAuth) {
    if (!user.isAuthenticated) {
      return <>{children}</>;
    } else return <Redirect to={'/'} />;
  } else {
    return <>{children}</>;
  }
};

export default UnprotectedRoute;
