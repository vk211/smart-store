import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">ID: {product.id}</p>
      <p className="mb-1"><strong>Brand:</strong> {product.brand}</p>
      <p className="mb-1"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      {product.discount > 0 && (
        <p className="mb-1 text-green-600"><strong>Discount:</strong> {product.discount}%</p>
      )}
      {product.rebate > 0 && (
        <p className="mb-1 text-blue-600"><strong>Rebate:</strong> ${product.rebate}</p>
      )}
      <p className="mb-2 text-sm">{product.description}</p>
      <p className="mb-1"><strong>Features:</strong></p>
      <ul className="list-disc list-inside mb-2 text-sm">
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      {product.batteryLife && (
        <p className="mb-1"><strong>Battery Life:</strong> {product.batteryLife}</p>
      )}
      <p className="mb-1"><strong>Wireless Protocol:</strong> {product.wirelessProtocol}</p>
      {product.wattage && (
        <p className="mb-1"><strong>Wattage:</strong> {product.wattage}</p>
      )}
      {product.powerSource && (
        <p className="mb-1"><strong>Power Source:</strong> {product.powerSource}</p>
      )}
      {product.displayType && (
        <p className="mb-1"><strong>Display Type:</strong> {product.displayType}</p>
      )}
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(product)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;