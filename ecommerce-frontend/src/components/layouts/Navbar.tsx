const Navbar = () => {
  return (
    <nav className='flex justify-between py-3 px-6 border-b'>
      <ul className='flex items-center gap-6'>
        <li className='text-lg'>🛍️ Online Shopping</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      <ul>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
