import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
        Personal Bookshelf
        </Link>
        <div>
          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Book Search
          </Link>
          <Link to="/bookshelf" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
             Bookshelf
          </Link>
        </div>
      </div>
    </nav>
    <Outlet/>
       </>
  );
};

export default Navbar;
