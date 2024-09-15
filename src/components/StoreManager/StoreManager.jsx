// src/components/StoreManager/StoreManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { mockData } from '../../mockdata';
import ProductCard from './ProductCard';

const StoreManagerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const allProducts = Object.entries(mockData).flatMap(([category, items]) => 
      items.map(item => ({ ...item, category }))
    );
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    let result = products;
    
    // Filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredProducts(result);
  }, [products, searchTerm, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter(p => p.id !== product.id));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Store Manager Dashboard</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded mr-2"
        />
        <button onClick={toggleSortOrder} className="p-2 bg-gray-200 rounded">
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {currentItems.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <div className="mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {editingProduct && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
      <h3 className="text-lg font-bold mb-4">Edit Product</h3>
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={editingProduct.name}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Brand:</label>
          <input
            type="text"
            name="brand"
            value={editingProduct.brand}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={editingProduct.price}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={editingProduct.discount}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Rebate ($):</label>
          <input
            type="number"
            name="rebate"
            value={editingProduct.rebate}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={editingProduct.description}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Features (comma-separated):</label>
          <input
            type="text"
            name="features"
            value={editingProduct.features.join(', ')}
            onChange={(e) => handleEditChange({
              target: {
                name: 'features',
                value: e.target.value.split(',').map(item => item.trim())
              }
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Battery Life:</label>
          <input
            type="text"
            name="batteryLife"
            value={editingProduct.batteryLife || ''}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Wireless Protocol:</label>
          <input
            type="text"
            name="wirelessProtocol"
            value={editingProduct.wirelessProtocol}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => setEditingProduct(null)}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default StoreManagerDashboard;