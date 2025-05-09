import React from 'react';
import { StarIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/solid';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="card group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button 
              className="p-2 bg-white rounded-full hover:bg-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Ajouter au panier
                console.log('Ajouter au panier:', product.id);
              }}
            >
              <ShoppingCartIcon className="h-5 w-5 text-secondary" />
            </button>
            <button 
              className="p-2 bg-white rounded-full hover:bg-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <EyeIcon className="h-5 w-5 text-secondary" />
            </button>
          </div>
        </div>
        <div className="absolute top-2 left-2 bg-primary text-secondary-dark text-xs font-bold px-2 py-1 rounded">
          {product.categoryName || 'Catégorie'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{product.price.toFixed(2)} Fcfa</span>
          <span className="text-sm text-gray-500">
            {product.User ? product.User.firstName + ' ' + product.User.lastName : 'Vendeur'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
