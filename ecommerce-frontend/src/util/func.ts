import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string) {
  if (!token) return true;
  const { exp } = jwtDecode<{ exp: number }>(token);
  const now = Math.floor(Date.now() / 1000);
  if (exp > now) return false;
  localStorage.setItem('token', '');
  return true;
}
