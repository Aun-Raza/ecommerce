import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserType {
  username: string;
  isAuthenticated: boolean;
  token: string;
}

type AuthContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export const defaultUser: UserType = {
  username: '',
  isAuthenticated: false,
  token: '',
};

export const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  setUser: (user: UserType) => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside the AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<UserType>(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { sub } = jwtDecode<{ sub: string }>(token);
      setUser({
        token: token,
        username: sub,
        isAuthenticated: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
