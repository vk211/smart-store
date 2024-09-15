import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./CartContext";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import UserAccount from "./components/UserAccount/UserAccount";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/Auth/AuthModal";
import StoreManagerDashboard from "./components/StoreManager/StoreManager";
import SalesmanDashboard from "./components/Salesman/Salesman";
import CustomerDashboard from "./components/Customer/Customer";

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      openAuthModal("login");
      return <Navigate to="/" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header
            user={user}
            onLogout={handleLogout}
            openAuthModal={openAuthModal}
          />
          <Navigation user={user} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/category/:categoryName" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<ShoppingCart />} />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <Checkout userId={user?.id}/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-status"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <OrderStatus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <UserAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/store-manager-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["storemanager"]}>
                    <StoreManagerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/salesman-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["salesman"]}>
                    <SalesmanDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <CustomerDashboard userId={user?.id} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-orders"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <CustomerDashboard userId={user?.id} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          {showAuthModal && (
            <AuthModal
              mode={authMode}
              onClose={() => setShowAuthModal(false)}
              onLogin={handleLogin}
              onSwitchMode={() =>
                setAuthMode(authMode === "login" ? "signup" : "login")
              }
            />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
