import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={`/images/${product.image}`} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <div>
            {product.discount ? (
              <div>
                <span className="text-lg font-bold text-red-500">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm line-through text-gray-500 ml-2">${product.price.toFixed(2)}</span>
                <span className="text-sm text-green-500 ml-2">Save {product.discount}%</span>
              </div>
            ) : (
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            )}
            {product.rebate > 0 && (
              <div className="text-sm text-blue-500">
                ${product.rebate} mail-in rebate available
              </div>
            )}
          </div>
          <Link 
            to={`/product/${product.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;