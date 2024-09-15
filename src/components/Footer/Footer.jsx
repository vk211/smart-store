import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">SmartHomes</h3>
            <p>Your one-stop shop for smart home devices.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/category/all" className="hover:text-blue-300">Products</Link></li>
              <li><Link to="/about" className="hover:text-blue-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-blue-300">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-300">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-blue-300">Returns</Link></li>
              <li><Link to="/warranty" className="hover:text-blue-300">Warranty</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-300"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-2xl hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-2xl hover:text-blue-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-2xl hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 SmartHomes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
