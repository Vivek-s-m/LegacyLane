import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            Legacy Lane
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-orange-200">Home</Link>
            <Link to="/add-temple" className="hover:text-orange-200">Contribute</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;