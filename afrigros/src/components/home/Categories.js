import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Données factices pour les catégories
const categories = [
  {
    id: 1,
    name: 'Électronique',
    description: 'Smartphones, ordinateurs, accessoires et plus',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    slug: 'electronique',
    count: 42
  },
  {
    id: 2,
    name: 'Vêtements',
    description: 'T-shirts, pantalons, robes et accessoires de mode',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    slug: 'vetements',
    count: 56
  },
  {
    id: 3,
    name: 'Maison',
    description: 'Meubles, décoration et articles pour la maison',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    slug: 'maison',
    count: 38
  },
  {
    id: 4,
    name: 'Alimentation',
    description: 'Épices, chocolats, cafés et produits alimentaires',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    slug: 'alimentation',
    count: 29
  }
];

const Categories = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explorer par Catégorie
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Parcourez notre sélection de produits par catégorie et trouvez exactement ce que vous cherchez.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/categories/${category.slug}`} 
                className="block group"
              >
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-sm font-medium">{category.count} produits</span>
                      <span className="text-white text-sm group-hover:translate-x-1 transition-transform">
                        Explorer →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories" className="btn-outline">
            Voir toutes les catégories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
