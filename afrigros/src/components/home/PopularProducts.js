import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/solid';

// Données factices pour les produits populaires
const popularProducts = [
  {
    id: 1,
    name: 'Smartphone ',
    description: 'Un smartphone de dernière génération avec des fonctionnalités avancées.',
    price: 90.000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Électronique'
  },
  {
    id: 2,
    name: 'T-shirt Premium',
    description: 'T-shirt en coton de haute qualité, confortable et durable.',
    price: 2400,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Vêtements'
  },
  {
    id: 3,
    name: 'Cafetière Automatique',
    description: 'Cafetière programmable avec plusieurs options de brassage.',
    price: 60.000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1d5e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Maison'
  },
  {
    id: 4,
    name: 'Chocolat Artisanal',
    description: 'Chocolat artisanal fabriqué avec des ingrédients biologiques.',
    price: 600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Alimentation'
  }
];

const PopularProducts = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Produits Populaires
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre sélection de produits les plus appréciés par notre communauté.
            Des articles de qualité qui font la différence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white rounded-full hover:bg-primary transition-colors">
                      <ShoppingCartIcon className="h-5 w-5 text-secondary" />
                    </button>
                    <Link to={`/products/${product.id}`} className="p-2 bg-white rounded-full hover:bg-primary transition-colors">
                      <EyeIcon className="h-5 w-5 text-secondary" />
                    </Link>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-primary text-secondary-dark text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
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
                  <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                  <Link 
                    to={`/products/${product.id}`}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="btn-primary">
            Voir tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
