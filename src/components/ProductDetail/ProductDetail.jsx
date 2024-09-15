import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AccessoryList from '../AccessoryList/AccessoryList';
import { CartContext } from '../../CartContext';
import { mockData } from '../../mockdata';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = () => {
      const allProducts = Object.values(mockData).flat();
      const foundProduct = allProducts.find(item => item.id === id);
      setProduct(foundProduct || null);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="product-detail bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <div className="flex flex-col md:flex-row">
        <img src={`/images/${product.image}`} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
        <div className="flex-1">
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h3 className="text-2xl font-bold mt-8 mb-4">Accessories</h3>
      <AccessoryList productId={id} />
    </div>
  );
}

export default ProductDetail;