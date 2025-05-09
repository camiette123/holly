import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LightningBoltIcon, 
  GlobeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/outline';

const Sustainability = () => {
  return (
    <section className="section bg-secondary text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Engagement Durable</h2>
            <p className="text-gray-300 mb-8">
              AfriGro s'engage à promouvoir des pratiques commerciales responsables. 
              Nous soutenons les artisans locaux, encourageons l'utilisation de matériaux 
              durables et favorisons le développement économique équitable sur le continent.
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <GlobeIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Matériaux Durables</h3>
                  <p className="text-gray-300">
                    Nous privilégions les produits fabriqués à partir de matériaux durables, 
                    recyclés ou biodégradables pour réduire notre impact environnemental.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <UserGroupIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Soutien aux Artisans</h3>
                  <p className="text-gray-300">
                    Nous travaillons directement avec les artisans et les petits producteurs, 
                    en leur offrant une plateforme pour présenter leur savoir-faire.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <CurrencyDollarIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Commerce Équitable</h3>
                  <p className="text-gray-300">
                    Nous nous assurons que nos partenaires reçoivent une rémunération juste 
                    pour leur travail, contribuant ainsi à l'économie locale.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <LightningBoltIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Empreinte Carbone</h3>
                  <p className="text-gray-300">
                    Nous compensons notre empreinte carbone en investissant dans des projets 
                    de reforestation et d'énergie renouvelable en Afrique.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/about" className="btn-primary">
                En savoir plus
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Artisan africain" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-lg shadow-lg">
                <p className="text-secondary-dark font-bold">
                  "Chaque achat raconte une histoire et soutient une communauté."
                </p>
              </div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-xl z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
