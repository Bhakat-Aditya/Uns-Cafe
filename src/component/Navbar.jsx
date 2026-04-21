import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/10">
      <Link to="/" className="text-2xl font-black tracking-tighter text-white">
        UNS<span className="text-orange-500">CAFE.</span>
      </Link>
      
      <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-300">
        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <Link to="/menu" className="hover:text-orange-500 transition-colors">Menu</Link>
        <Link to="/gallery" className="hover:text-orange-500 transition-colors">Gallery</Link>
        <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
      </div>

      <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
    </nav>
  );
};

export default Navbar;