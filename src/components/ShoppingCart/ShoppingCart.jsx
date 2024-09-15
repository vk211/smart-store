import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';

function ShoppingCart() {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      if (item.discount) {
        itemTotal -= itemTotal * (item.discount / 100);
      }
      if (item.rebate) {
        itemTotal -= item.rebate * item.quantity;
      }
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const calculateItemSubtotal = (item) => {
    let subtotal = item.price * item.quantity;
    if (item.discount) {
      subtotal -= subtotal * (item.discount / 100);
    }
    if (item.rebate) {
      subtotal -= item.rebate * item.quantity;
    }
    return subtotal.toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeItem(itemId);
    }
  };

  return (
    <div className="shopping-cart bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <img src={`/images/${item.image}`} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                {item.discount && (
                  <p className="text-green-600">Discount: {item.discount}%</p>
                )}
                {item.rebate && (
                  <p className="text-blue-600">Rebate: ${item.rebate.toFixed(2)}</p>
                )}
                <p className="text-gray-600">Subtotal: ${calculateItemSubtotal(item)}</p>
                <div className="flex items-center mt-2">
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                    className="w-16 p-1 border border-gray-300 rounded mr-2"
                  />
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
            <button 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className={`block w-full text-center px-4 py-2 rounded mt-4 ${
                cartItems.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="block text-center text-blue-500 hover:underline mt-2">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;