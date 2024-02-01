import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
