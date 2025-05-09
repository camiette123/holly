import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Arrière-plan avec overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/60 z-10"></div>
      
      {/* Image d'arrière-plan */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1562043236-559c3bc5db36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="container-custom relative z-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-primary">AfriGro</span>, votre marché africain en ligne
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
              Découvrez des produits authentiques et de qualité, soutenez les artisans locaux et participez au développement économique du continent africain.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="btn-primary text-center">
                Explorer les produits
              </Link>
              <Link to="/about" className="btn-outline text-white border-white hover:bg-white/20 text-center">
                En savoir plus
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Cercle décoratif */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/30 blur-xl"></div>
              
              {/* Carte produit en avant */}
              <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-3 z-30 relative">
                <div className="bg-gray-200 rounded-lg h-48 mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Produit africain" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Ecouteur Original</h3>
                <p className="text-gray-600 text-sm mb-3">Découvrez notre collection d'instruments les plus précieux et moins chers de qualité.</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">6000 Fcfa</span>
                  <Link to="/products"><button className="bg-primary text-secondary-dark px-3 py-1 rounded-md text-sm font-medium">
                    Voir
                  </button></Link>
                </div>
              </div>
              
              {/* Carte produit en arrière */}
              <div className="bg-white rounded-xl shadow-xl p-6 transform -rotate-6 absolute top-10 -left-10 z-20">
                <div className="bg-gray-200 rounded-lg h-48 mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Épices africaines" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Épices exotiques</h3>
                <p className="text-gray-600 text-sm mb-3">Des saveurs authentiques pour sublimer vos plats.</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">3000 Fcfa</span>
                  <button className="bg-primary text-secondary-dark px-3 py-1 rounded-md text-sm font-medium">
                    Voir
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Découvrir plus</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div 
                className="w-1.5 h-3 bg-white rounded-full mt-2"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
