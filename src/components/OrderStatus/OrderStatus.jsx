import React, { useState } from 'react';

function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would fetch the order status from your backend
    setOrderStatus({
      status: 'Processing',
      canCancel: true,
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
    });
  };

  const handleCancel = () => {
    // In a real application, you would send a cancellation request to your backend
    alert('Order cancellation request submitted.');
  };

  return (
    <div className="order-status bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6">Order Status</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter your order number"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            Check Status
          </button>
        </div>
      </form>
      {orderStatus && (
        <div className="order-details">
          <p className="mb-2">Status: <strong>{orderStatus.status}</strong></p>
          <p className="mb-4">Estimated delivery/pickup date: <strong>{orderStatus.deliveryDate}</strong></p>
          {orderStatus.canCancel && (
            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel Order
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderStatus;