import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/react/outline';

const steps = [
  {
    id: 1,
    icon: <SearchIcon className="h-12 w-12 text-white" />,
    title: 'Parcourez nos produits',
    description: 'Explorez notre vaste catalogue de produits authentiques africains, organisés par catégories pour faciliter votre recherche.',
    color: 'bg-primary'
  },
  {
    id: 2,
    icon: <ShoppingCartIcon className="h-12 w-12 text-white" />,
    title: 'Ajoutez au panier',
    description: 'Sélectionnez vos articles préférés, choisissez la quantité souhaitée et ajoutez-les à votre panier d\'achat.',
    color: 'bg-secondary'
  },
  {
    id: 3,
    icon: <TruckIcon className="h-12 w-12 text-white" />,
    title: 'Recevez votre commande',
    description: 'Finalisez votre achat et recevez votre commande directement à votre porte dans les meilleurs délais.',
    color: 'bg-accent'
  }
];

const HowItWorks = () => {
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
            Comment Ça Marche ?
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Acheter sur AfriGro est simple, rapide et sécurisé. Suivez ces étapes pour découvrir et acquérir des produits authentiques.
          </motion.p>
        </div>

        <div className="relative">
          {/* Ligne de connexion entre les étapes */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gray-200 z-0">
            <div className="absolute left-0 top-0 bottom-0 bg-primary w-1/3"></div>
            <div className="absolute left-1/3 top-0 bottom-0 bg-secondary w-1/3"></div>
            <div className="absolute left-2/3 top-0 bottom-0 bg-accent w-1/3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-16 bg-gray-100 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-3">Prêt à découvrir des produits africains authentiques ?</h3>
          <p className="text-gray-600 mb-6">
            Commencez votre expérience de shopping dès maintenant et soutenez les artisans et producteurs africains.
          </p>
          <button className="btn-primary">
            Commencer vos achats
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
