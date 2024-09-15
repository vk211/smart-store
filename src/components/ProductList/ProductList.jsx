import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { mockData } from '../../mockdata';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const loadProducts = () => {
      let productsToSet;
      if (!categoryName || categoryName === 'all') {
        productsToSet = Object.values(mockData).flat();
      } else {
        const category = categoryName.replace('smart-', '');
        productsToSet = mockData[category] || [];
      }
      setProducts(productsToSet);
    };

    loadProducts();
  }, [categoryName]);

  return (
    <div className="product-list">
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;