import React, { useState, useEffect } from "react";

// Mock data for initial customers and orders
const initialCustomers = [
//   { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     phone: "987-654-3210",
//   },
];

const initialOrders = [
//   {
//     id: 1,
//     customerId: 1,
//     product: "Smart Doorbell",
//     status: "Pending",
//     date: "2024-06-01",
//   },
//   {
//     id: 2,
//     customerId: 2,
//     product: "Smart Lock",
//     status: "Shipped",
//     date: "2024-05-28",
//   },
];
const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data, (key, value) => {
      // Don't include functions or undefined values
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

// const saveToLocalStorage = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error saving to localStorage:', error);
//     }
//   };

//   const loadFromLocalStorage = (key, defaultValue) => {
//     try {
//       const storedData = localStorage.getItem(key);
//       return storedData ? JSON.parse(storedData) : defaultValue;
//     } catch (error) {
//       console.error('Error loading from localStorage:', error);
//       return defaultValue;
//     }
//   };

const SalesmanDashboard = () => {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");
    return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });
  //   const [customers, setCustomers] = useState(initialCustomers);

  //   const [customers, setCustomers] = useState(() =>
  //     loadFromLocalStorage("customers", initialCustomers)
  //   );
  //   const [orders, setOrders] = useState(() =>
  //     loadFromLocalStorage("orders", initialOrders)
  //   );

  //   useEffect(() => {
  //     saveToLocalStorage("customers", customers);
  //   }, [customers]);

  //   useEffect(() => {
  //     saveToLocalStorage("orders", orders);
  //   }, [orders]);

  useEffect(() => {
    const customersData = customers.map(({ id, name, email, phone }) => ({
      id,
      name,
      email,
      phone,
    }));
    saveToLocalStorage("customers", customersData);
  }, [customers]);

  useEffect(() => {
    const ordersData = orders.map(
      ({ id, customerId, product, status, date }) => ({
        id,
        customerId,
        product,
        status,
        date,
      })
    );
    saveToLocalStorage("orders", ordersData);
  }, [orders]);

  //   const [orders, setOrders] = useState(initialOrders);
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

  // Customer management functions

  const addCustomer = () => {
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomerWithId = { ...newCustomer, id };
    setCustomers(prevCustomers => [...prevCustomers, newCustomerWithId]);
    setNewCustomer({ name: '', email: '', phone: '' });
  };
  
 

//   const addCustomer = (newCustomer) => {
//     const updatedCustomers = [...customers, newCustomer];
//     setCustomers(updatedCustomers);
//   };

  const updateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((c) =>
      c.id === updatedCustomer.id ? updatedCustomer : c
    );
    setCustomers(updatedCustomers);
  };

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter((c) => c.id !== id);
    setCustomers(updatedCustomers);
    // Also delete associated orders
    const updatedOrders = orders.filter((o) => o.customerId !== id);
    setOrders(updatedOrders);
  };


  const addOrder = () => {
    const id = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newOrderWithId = { ...newOrder, id };
    setOrders(prevOrders => [...prevOrders, newOrderWithId]);
    setNewOrder({ customerId: '', product: '', status: 'Pending', date: '' });
  };
//   const addOrder = (newOrder) => {
//     const updatedOrders = [...orders, newOrder];
//     setOrders(updatedOrders);
//   };

  const updateOrder = (updatedOrder) => {
    const updatedOrders = orders.map((o) =>
      o.id === updatedOrder.id ? updatedOrder : o
    );
    setOrders(updatedOrders);
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((o) => o.id !== id);
    setOrders(updatedOrders);
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
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
            className="mr-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
            className="mr-2 p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone: e.target.value })
            }
            className="mr-2 p-2 border rounded"
          />
          <button
            onClick={addCustomer}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Customer
          </button>
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
                  <button
                    onClick={() => setEditingCustomer(customer)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
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
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerId: parseInt(e.target.value) })
            }
            className="mr-2 p-2 border rounded"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Product"
            value={newOrder.product}
            onChange={(e) =>
              setNewOrder({ ...newOrder, product: e.target.value })
            }
            className="mr-2 p-2 border rounded"
          />
          <input
            type="date"
            value={newOrder.date}
            onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
            className="mr-2 p-2 border rounded"
          />
          <button
            onClick={addOrder}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Order
          </button>
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
                <td className="border p-2">
                  {customers.find((c) => c.id === order.customerId)?.name}
                </td>
                <td className="border p-2">{order.product}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">{order.date}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingOrder(order)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Edit Customer</h3>
            <input
              type="text"
              value={editingCustomer.name}
              onChange={(e) =>
                setEditingCustomer({ ...editingCustomer, name: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              value={editingCustomer.email}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  email: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="tel"
              value={editingCustomer.phone}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={updateCustomer}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingCustomer(null)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Edit Order</h3>
            <select
              value={editingOrder.customerId}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  customerId: parseInt(e.target.value),
                })
              }
              className="w-full p-2 mb-2 border rounded"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={editingOrder.product}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, product: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={editingOrder.status}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, status: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input
              type="date"
              value={editingOrder.date}
              onChange={(e) =>
                setEditingOrder({ ...editingOrder, date: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={updateOrder}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingOrder(null)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesmanDashboard;
