import React from 'react';
import Image from 'next/image';
type NavbarProps = {
  children: React.ReactNode;
}

const Navbar = ({ children }:NavbarProps) => {
  return (
    <div id="navbar" className="fixed bg-[#112850] p-5 flex w-full justify-between z-50   ">
      <Image   src={'/persons.svg'} alt='' width={40} height={40}  style={{ filter: 'invert(1)' }}></Image>
      {children}
    </div>
  );
};

export default Navbar;
