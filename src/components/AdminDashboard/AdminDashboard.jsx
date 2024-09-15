import React, { useState } from 'react';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'customers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Customers
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Orders
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

function ProductManagement() {
  // Implement product management functionality
  return <div>Product Management</div>;
}

function CustomerManagement() {
  // Implement customer management functionality
  return <div>Customer Management</div>;
}

function OrderManagement() {
  // Implement order management functionality
  return <div>Order Management</div>;
}

export default AdminDashboard;