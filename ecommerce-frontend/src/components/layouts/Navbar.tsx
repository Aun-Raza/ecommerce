import { Link, useHistory } from 'react-router-dom';
import { defaultUser, useAuthContext } from '../../context/AuthContext';
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Image,
  Avatar,
} from '@nextui-org/react';

const Navbar = () => {
  const { user, setUser } = useAuthContext();
  const history = useHistory();
  return (
    <NavbarUI>
      <Link to='/'>
        <NavbarBrand className='gap-2'>
          <Image src='vault.png' className='w-12' />
          <p className='navbar-heading'>NextGenVault</p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify='end'>
        {user.isAuthenticated && (
          <>
            <NavbarItem>
              <Link to='/orders' className=' flex items-center gap-1'>
                <Image src='icons/order.png' className='w-8' />
                <p>Your Orders</p>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to='/cart' className=' flex items-center gap-1'>
                <Image src='icons/shopping-cart.png' className='w-8' />
                <p>Cart</p>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color='primary'
                variant='flat'
                onClick={() => {
                  setUser(defaultUser);
                  localStorage.setItem('token', '');
                  history.push('/login');
                }}
              >
                Logout
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Avatar color='secondary' name={user.username.toUpperCase()} />
            </NavbarItem>
          </>
        )}
        {!user.isAuthenticated && (
          <>
            <NavbarItem>
              <Button color='secondary' variant='flat'>
                <Link to='/register'>Become a member</Link>
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color='primary' variant='flat'>
                <Link to='/login'>Login</Link>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NavbarUI>
  );
};

export default Navbar;
