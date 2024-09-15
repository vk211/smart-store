import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";

function Header({ user, onLogout, openAuthModal }) {
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          SmartHomes
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              {user.role === "customer" && (
                <Link
                  to="/customer-orders"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  View Orders
                </Link>
              )}
              {user.role === "storemanager" && (
                <Link
                  to="/store-manager-dashboard"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Manager Dashboard
                </Link>
              )}
              {user.role === "salesman" && (
                <Link
                  to="/salesman-dashboard"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Salesman Dashboard
                </Link>
              )}
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("login")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;