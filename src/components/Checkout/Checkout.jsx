// src/components/Checkout/Checkout.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';

function Checkout({userId}) {
  const { cartItems, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit_card',
    receiptMethod: 'delivery',  // New field for delivery method
    storeLocation: '',  // New field for store location if pickup is selected
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = Math.random().toString(36).substr(2, 9);
    const order = {
      ...formData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      orderDate: new Date().toISOString(),
      orderId: orderId,
      status: 'Pending',
      id: userId
    };
  
    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  
    // Store or update customer in localStorage
    const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customerIndex = existingCustomers.findIndex(c => c.email === formData.email);
    if (customerIndex === -1) {
      // New customer
      const newCustomer = {
        id: existingCustomers.length + 1,
        name: formData.name,
        email: formData.email,
        phone: '', // You might want to add a phone field to your form
        orders: [orderId]
      };
      existingCustomers.push(newCustomer);
    } else {
      // Existing customer
      if (!existingCustomers[customerIndex].orders) {
        existingCustomers[customerIndex].orders = []; // Initialize orders array if it doesn't exist
      }
      existingCustomers[customerIndex].orders.push(orderId);
    }
    localStorage.setItem('customers', JSON.stringify(existingCustomers));
  
    // Clear cart
    cartItems.forEach(item => removeItem(item.id));
  
    // Navigate to order confirmation page
    navigate('/order-confirmation', { state: { order } });
  };

  // Mock store locations (you can replace this with actual data)
  const storeLocations = [
    "New York Store - 123 Broadway, New York, NY 10001",
    "Los Angeles Store - 456 Hollywood Blvd, Los Angeles, CA 90028",
    "Chicago Store - 789 Michigan Ave, Chicago, IL 60611",
  ];


  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="receiptMethod" className="block mb-1">Delivery Method</label>
          <select
            id="receiptMethod"
            name="receiptMethod"
            value={formData.receiptMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="delivery">Home Delivery</option>
            <option value="pickup">In-Store Pickup</option>
          </select>
        </div>
        {formData.receiptMethod === 'delivery' ? (
          <>
            <div>
              <label htmlFor="address" className="block mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="city" className="block mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="zipCode" className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="storeLocation" className="block mb-1">Select Store for Pickup</label>
            <select
              id="storeLocation"
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select a store</option>
              {storeLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="paymentMethod" className="block mb-1">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;