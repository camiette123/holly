import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/outline';

// Données factices pour les articles de blog
const blogPosts = [
  {
    id: 1,
    title: 'Les tendances de la mode africaine en 2025',
    excerpt: 'Découvrez les dernières tendances de la mode africaine qui font sensation cette année et comment les intégrer à votre garde-robe.',
    image: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    date: '3 mai 2025',
    readTime: '5 min',
    category: 'Mode'
  },
  {
    id: 2,
    title: 'L\'art de la cuisine africaine : épices et saveurs',
    excerpt: 'Plongez dans l\'univers des épices africaines et apprenez comment elles peuvent transformer vos plats quotidiens en expériences gustatives uniques.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    date: '28 avril 2025',
    readTime: '7 min',
    category: 'Cuisine'
  },
  {
    id: 3,
    title: 'Artisanat africain : traditions et innovations',
    excerpt: 'Comment les artisans africains allient traditions ancestrales et techniques modernes pour créer des pièces uniques et durables.',
    image: 'https://images.unsplash.com/photo-1516633630673-67bbad747022?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    date: '15 avril 2025',
    readTime: '6 min',
    category: 'Artisanat'
  }
];

const LatestNews = () => {
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
            Dernières Nouvelles & Tendances
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Restez informé des dernières tendances, découvertes et histoires inspirantes du monde africain.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="card group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 bg-primary text-secondary-dark text-xs font-bold px-3 py-1">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{post.readTime} de lecture</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Lire la suite
                  <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="btn-outline">
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
