import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

// Données factices pour les témoignages
const testimonials = [
  {
    id: 1,
    name: 'Camiette AHOUANGAN',
    role: 'Cliente fidèle',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    content: 'Je suis ravie de la qualité des produits que j\'ai achetés sur AfriGro. Les articles sont authentiques et l\'expédition a été rapide. Je recommande vivement cette plateforme à tous ceux qui cherchent des produits africains de qualité.',
    rating: 5
  },
  {
    id: 2,
    name: 'Paghiel AHOUANGAN',
    role: 'Collectionneur d\'art',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    content: 'En tant que collectionneur d\'art africain, j\'ai trouvé sur AfriGro des pièces uniques que je n\'avais jamais vues ailleurs. Le service client est exceptionnel et les descriptions des produits sont très détaillées.',
    rating: 5
  },
  // {
  //   id: 3,
  //   name: 'Amina Koné',
  //   role: 'Décoratrice d\'intérieur',
  //   avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  //   content: 'AfriGro est devenu ma source principale pour trouver des éléments de décoration authentiques. La diversité des produits est impressionnante et les prix sont très raisonnables pour la qualité offerte.',
  //   rating: 4
  // },
  // {
  //   id: 4,
  //   name: 'Jean-Pierre Lefèvre',
  //   role: 'Chef cuisinier',
  //   avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
  //   content: 'Les épices et ingrédients que j\'ai commandés sur AfriGro ont transformé mes plats. La fraîcheur et l\'authenticité sont au rendez-vous. Je suis particulièrement impressionné par la rapidité de livraison.',
  //   rating: 5
  // }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

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
            Ce que disent nos clients
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez les expériences de nos clients satisfaits qui ont choisi AfriGro pour leurs achats.
          </motion.p>
        </div>

        <div className="relative">
          <div className="max-w-3xl mx-auto">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-custom p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name} 
                  className="w-20 h-20 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 mb-2">{testimonials[currentIndex].role}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 text-lg italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
            </motion.div>
          </div>

          {/* Contrôles de navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-primary transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-primary transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
