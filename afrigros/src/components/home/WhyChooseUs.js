import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, TruckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/outline';

const features = [
  {
    id: 1,
    icon: <ShieldCheckIcon className="h-12 w-12 text-primary" />,
    title: 'Produits Authentiques',
    description: 'Tous nos produits sont soigneusement sélectionnés pour garantir leur authenticité et leur qualité exceptionnelle.'
  },
  {
    id: 2,
    icon: <TruckIcon className="h-12 w-12 text-primary" />,
    title: 'Livraison Rapide',
    description: 'Nous nous engageons à livrer vos commandes rapidement et en toute sécurité, où que vous soyez.'
  },
  {
    id: 3,
    icon: <CurrencyDollarIcon className="h-12 w-12 text-primary" />,
    title: 'Prix Équitables',
    description: 'Nous proposons des prix justes qui rémunèrent équitablement les producteurs tout en restant accessibles.'
  },
  {
    id: 4,
    icon: <UserGroupIcon className="h-12 w-12 text-primary" />,
    title: 'Support Communautaire',
    description: 'En achetant sur AfriGro, vous soutenez directement les artisans et producteurs locaux africains.'
  }
];

const WhyChooseUs = () => {
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
            Pourquoi Choisir AfriGro ?
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nous nous distinguons par notre engagement envers la qualité, l'authenticité et le commerce équitable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-lg p-6 shadow-custom text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-primary/10 rounded-xl p-8 border-l-4 border-primary"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <img 
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Artisan africain" 
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Notre Mission</h3>
              <p className="text-gray-700">
                Chez AfriGro, notre mission est de créer un pont entre les artisans africains talentueux et les consommateurs du monde entier. 
                Nous visons à promouvoir le commerce équitable, à préserver les savoir-faire traditionnels et à contribuer au développement 
                économique durable des communautés locales.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
