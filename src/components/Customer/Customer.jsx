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
    // Filter orders for the current user
    const userOrders = storedOrders.filter(order => order.id === userId);
    console.log("storedorders = ", storedOrders)
    console.log("userOrders = ", userOrders, " userid = ", userId)
    setOrders(userOrders);
  }, [userId]);

  const deleteOrder = (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);

      // Update localStorage
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedAllOrders = allOrders.filter(order => order.id !== id);
      localStorage.setItem('orders', JSON.stringify(updatedAllOrders));
    }
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      {customer && (
        <div>
          <h3>Customer Information</h3>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
        </div>
      )}
      <div>
        <h3>Your Orders</h3>
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
                <tr key={order.id}>
                  <td className="border p-2">{order.items.map(item => item.name).join(', ')}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => deleteOrder(order.id)}
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