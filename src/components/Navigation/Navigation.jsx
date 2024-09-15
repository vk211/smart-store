import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/category/all" className="hover:text-blue-300">All Products</Link></li>
          <li><Link to="/category/smart-doorbells" className="hover:text-blue-300">Smart Doorbells</Link></li>
          <li><Link to="/category/smart-doorlocks" className="hover:text-blue-300">Smart Doorlocks</Link></li>
          <li><Link to="/category/smart-speakers" className="hover:text-blue-300">Smart Speakers</Link></li>
          <li><Link to="/category/smart-lighting" className="hover:text-blue-300">Smart Lighting</Link></li>
          <li><Link to="/category/smart-thermostats" className="hover:text-blue-300">Smart Thermostats</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;