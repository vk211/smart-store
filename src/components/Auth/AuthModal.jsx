// import React from 'react';
import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthModal({ mode, onClose, onLogin, onSwitchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login/signup logic here
    const userData = { email, role: "customer" }; // You'd get this from your backend
    onLogin(userData);

    // Redirect to the checkout page or the page they were trying to access
    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full m-4">
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        {mode === "login" ? (
          <Login onLogin={onLogin} />
        ) : (
          <Signup onSignup={onLogin} />
        )}
        <p className="mt-4 text-center text-sm">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={onSwitchMode}
            className="text-blue-500 hover:underline font-medium"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
