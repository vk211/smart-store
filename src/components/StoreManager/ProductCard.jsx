// src/components/StoreManager/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>ID: {product.id}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <div className="mt-2">
        <button 
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(product)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;