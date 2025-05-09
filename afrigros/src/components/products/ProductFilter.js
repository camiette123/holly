import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductFilter = ({ 
  categories, 
  selectedCategory, 
  priceRange, 
  onCategoryChange, 
  onPriceChange 
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [minPrice, maxPrice] = priceRange;
  
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = Number(value);
    setLocalPriceRange(newRange);
  };

  const handlePriceApply = () => {
    // S'assurer que le min est inférieur au max
    const sortedRange = [...localPriceRange].sort((a, b) => a - b);
    onPriceChange(sortedRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4 border-b pb-2">Filtres</h3>
      
      {/* Catégories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Catégories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategory === category.name}
                onChange={() => onCategoryChange(category.name)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label 
                htmlFor={`category-${category.id}`} 
                className="ml-2 text-sm text-gray-700 flex justify-between w-full"
              >
                <span>{category.name}</span>
                <span className="text-gray-500">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Plage de prix */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Prix (fcfa)</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="min-price" className="sr-only">Prix minimum</label>
              <input
                type="number"
                id="min-price"
                min="0"
                max="10000"
                value={localPriceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Min"
              />
            </div>
            <span className="text-gray-500">-</span>
            <div>
              <label htmlFor="max-price" className="sr-only">Prix maximum</label>
              <input
                type="number"
                id="max-price"
                min="0"
                max="10000"
                value={localPriceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Max"
              />
            </div>
          </div>
          
          <div className="relative pt-1">
            <input
              type="range"
              min="0"
              max="1000"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
          </div>
          
          <button
            onClick={handlePriceApply}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
      
      {/* Évaluations */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Évaluations</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">& plus</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bouton de réinitialisation */}
      <button
        onClick={() => {
          onCategoryChange('');
          onPriceChange([0, 1000]);
        }}
        className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export default ProductFilter;
