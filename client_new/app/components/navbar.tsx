import React from 'react';

type NavbarProps = {
  children: React.ReactNode;
}

const Navbar = ({ children }:NavbarProps) => {
  return (
    <div id="navbar" className="fixed bg-gradient-to-r from-amber-50 to-amber-100 p-5 flex w-full justify-between z-50   ">
      {children}
    </div>
  );
};

export default Navbar;
