// src/components/Customer/Customer.jsx
import React, { useState, useEffect } from 'react';

const Customer = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Load customer data from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    const currentCustomer = storedCustomers.find(c => c.id === userId);
    setCustomer(currentCustomer);

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log("All stored orders:", storedOrders);
    // Filter orders for the current user
    const userOrders = storedOrders.filter(order => order.userId === userId);
    console.log("Filtered user orders:", userOrders, "userId:", userId);
    setOrders(userOrders);
  }, [userId]);

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.filter(order => order.orderId !== orderId);
      setOrders(updatedOrders);

      // Update localStorage
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedAllOrders = allOrders.filter(order => order.orderId !== orderId);
      localStorage.setItem('orders', JSON.stringify(updatedAllOrders));

      // Update customer's orders in localStorage
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const updatedCustomer = customers.find(c => c.id === userId);
      if (updatedCustomer) {
        updatedCustomer.orders = updatedCustomer.orders.filter(id => id !== orderId);
        localStorage.setItem('customers', JSON.stringify(customers));
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>
      {customer && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td className="border p-2">
                    {order.items && Array.isArray(order.items) 
                      ? order.items.map(item => item.name).join(', ')
                      : 'No items'}
                  </td>
                  <td className="border p-2">{order.status || 'Unknown'}</td>
                  <td className="border p-2">
                    {order.orderDate 
                      ? new Date(order.orderDate).toLocaleDateString()
                      : 'No date'}
                  </td>
                  <td className="border p-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => deleteOrder(order.orderId)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customer;