import React from 'react';
import LOGO from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className='bg-white flex items-center justify-between px-2 py-1 drop-shadow sticky top-0 z-10'>
      <img src={LOGO} alt='logo' className='h-3' />
    </div>
  );
};

export default Navbar;
