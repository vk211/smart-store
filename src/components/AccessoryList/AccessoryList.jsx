import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import caseImage from '../../assets/case.jpeg';
import cableImage from '../../assets/cable.jpg';
import guardImage from '../../assets/screenguard.jpeg';
import wallmountImage from '../../assets/wallmount2.jpg';

function AccessoryList({ productId }) {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch accessories from an API
    // For this example, we'll use mock data
    const fetchAccessories = async () => {
      // Simulating an API call
      const mockAccessories = [
        { id: 1, name: 'Protective Case', price: 19.99, image: caseImage },
        { id: 2, name: 'Extra Cable', price: 9.99, image: cableImage },
        { id: 3, name: 'Wall Mount', price: 24.99, image: wallmountImage },
        { id: 4, name: 'Screen Protector', price: 7.99, image: guardImage },
      ];
      setAccessories(mockAccessories);
    };

    fetchAccessories();
  }, [productId]);

  return (
    <div className="accessory-list">
      <h3 className="text-xl font-semibold mb-4">Compatible Accessories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={accessory.image} 
              alt={accessory.name} 
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{accessory.name}</h4>
              <p className="text-gray-600 mb-2">${accessory.price.toFixed(2)}</p>
              <Link 
                to={`/product/${accessory.id}`} 
                className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccessoryList;