import { Link, useHistory } from 'react-router-dom';
import { defaultUser, useAuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useAuthContext();
  const history = useHistory();
  return (
    <nav className='flex justify-between py-3 px-6 border-b'>
      <ul className='flex items-center gap-6'>
        <li className='text-lg'>
          <Link to='/'>🛍️ Online Shopping</Link>
        </li>
        <li>
          <Link to='/about-us'>About Us</Link>
        </li>
        <li>
          <Link to='/contact-us'>Contact Us</Link>
        </li>
      </ul>
      <ul className='flex items-center gap-4'>
        {user.isAuthenticated && (
          <>
            <Link to='/cart'>Cart</Link>
            <li>
              <span
                className='cursor-pointer'
                onClick={() => {
                  setUser(defaultUser);
                  localStorage.setItem('token', '');
                  history.push('/login');
                }}
              >
                Logout
              </span>
            </li>
            <li>{user.username}</li>
          </>
        )}
        {!user.isAuthenticated && <Link to='/login'>Login</Link>}
      </ul>
    </nav>
  );
};

export default Navbar;
