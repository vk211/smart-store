import React, { useState, useEffect } from "react";

const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data, (key, value) => {
      if (typeof value === "function" || typeof value === "undefined") {
        return undefined;
      }
      return value;
    });
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const SalesmanDashboard = () => {
  const [customers, setCustomers] = useState(() => 
    loadFromLocalStorage("customers", [])
  );
  const [orders, setOrders] = useState(() => 
    loadFromLocalStorage("orders", [])
  );

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [newOrder, setNewOrder] = useState({
    customerId: "",
    product: "",
    status: "Pending",
    date: "",
  });

  useEffect(() => {
    saveToLocalStorage("customers", customers);
  }, [customers]);

  useEffect(() => {
    saveToLocalStorage("orders", orders);
  }, [orders]);

  // Customer management functions
  const addCustomer = () => {
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomerWithId = { ...newCustomer, id };
    setCustomers(prevCustomers => [...prevCustomers, newCustomerWithId]);
    setNewCustomer({ name: '', email: '', phone: '' });
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
    );
    setEditingCustomer(null);
  };

  const deleteCustomer = (id) => {
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== id));
    setOrders(prevOrders => prevOrders.filter(o => o.customerId !== id));
  };

  // Order management functions
  const addOrder = () => {
    const id = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newOrderWithId = { ...newOrder, id };
    setOrders(prevOrders => [...prevOrders, newOrderWithId]);
    setNewOrder({ customerId: '', product: '', status: 'Pending', date: '' });
  };

  const updateOrder = (updatedOrder) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
    );
    setEditingOrder(null);
  };

  const deleteOrder = (id) => {
    setOrders(prevOrders => prevOrders.filter(o => o.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Salesman Dashboard</h1>

      {/* Customer Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Customer Management</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
            className="mr-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
            className="mr-2 p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
            className="mr-2 p-2 border rounded"
          />
          <button onClick={addCustomer} className="bg-blue-500 text-white p-2 rounded">Add Customer</button>
        </div>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border p-2">{customer.name}</td>
                <td className="border p-2">{customer.email}</td>
                <td className="border p-2">{customer.phone}</td>
                <td className="border p-2">
                  <button onClick={() => setEditingCustomer(customer)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                  <button onClick={() => deleteCustomer(customer.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Management Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Order Management</h2>
        <div className="mb-4">
          <select
            value={newOrder.customerId}
            onChange={(e) => setNewOrder({...newOrder, customerId: e.target.value})}
            className="mr-2 p-2 border rounded"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Product"
            value={newOrder.product}
            onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
            className="mr-2 p-2 border rounded"
          />
          <input
            type="date"
            value={newOrder.date}
            onChange={(e) => setNewOrder({...newOrder, date: e.target.value})}
            className="mr-2 p-2 border rounded"
          />
          <button onClick={addOrder} className="bg-blue-500 text-white p-2 rounded">Add Order</button>
        </div>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{customers.find((c) => c.id === parseInt(order.customerId))?.name}</td>
                <td className="border p-2">{order.product}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">{order.date}</td>
                <td className="border p-2">
                  <button onClick={() => setEditingOrder(order)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                  <button onClick={() => deleteOrder(order.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Customer</h3>
            <input
              type="text"
              value={editingCustomer.name}
              onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              value={editingCustomer.email}
              onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="tel"
              value={editingCustomer.phone}
              onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
              className="w-full p-2 mb-4 border rounded"
            />
            <button onClick={() => updateCustomer(editingCustomer)} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button onClick={() => setEditingCustomer(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Order</h3>
            <select
              value={editingOrder.customerId}
              onChange={(e) => setEditingOrder({...editingOrder, customerId: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={editingOrder.product}
              onChange={(e) => setEditingOrder({...editingOrder, product: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={editingOrder.status}
              onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input
              type="date"
              value={editingOrder.date}
              onChange={(e) => setEditingOrder({...editingOrder, date: e.target.value})}
              className="w-full p-2 mb-4 border rounded"
            />
            <button onClick={() => updateOrder(editingOrder)} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button onClick={() => setEditingOrder(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesmanDashboard;