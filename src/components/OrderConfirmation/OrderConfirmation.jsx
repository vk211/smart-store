import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <div>No order information available.</div>;
  }

  const calculateFinalPrice = (item) => {
    const itemTotal = item.price * item.quantity;
    const discountAmount = itemTotal * (item.discount / 100);
    const rebateAmount = item.rebate * item.quantity;
    return itemTotal - discountAmount - rebateAmount;
  };

  const calculateOrderTotal = () => {
    return order.items.reduce((total, item) => total + calculateFinalPrice(item), 0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="mb-4">Thank you for your order, {order.name}!</p>
      <p className="mb-2">Order ID: {order.orderId}</p>
      <p className="mb-2">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
      <p className="mb-4">Total: ${calculateOrderTotal().toFixed(2)}</p>
      <h3 className="text-xl font-bold mb-2">Order Details:</h3>
      <ul className="list-disc list-inside mb-4">
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Original Price: ${(item.price * item.quantity).toFixed(2)}
            {item.discount > 0 && ` - Discount: ${item.discount}%`}
            {item.rebate > 0 && ` - Rebate: $${item.rebate.toFixed(2)}`}
            <br />
            Final Price: ${calculateFinalPrice(item).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-bold mb-2">
        {order.receiptMethod === 'delivery' ? 'Shipping Information:' : 'Pickup Location:'}
      </h3>
      {order.receiptMethod === 'delivery' ? (
        <div>
          <p>{order.address}</p>
          <p>{order.city}, {order.zipCode}</p>
        </div>
      ) : (
        <p>{order.storeLocation}</p>
      )}
      <Link to="/" className="block mt-6 text-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderConfirmation;