import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, CheckCircleIcon } from '@heroicons/react/outline';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple de l'email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }
    
    // Simulation d'envoi réussi
    setIsSubmitted(true);
    setError('');
    
    // Dans une application réelle, vous enverriez l'email à votre API ici
    console.log('Email soumis:', email);
  };

  return (
    <section className="section bg-primary/10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
                  <MailIcon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Restez informé !
                </h2>
                <p className="text-gray-600 mb-6">
                  Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles, 
                  offres spéciales et conseils exclusifs sur les produits africains.
                </p>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-green-700">
                      Merci pour votre inscription ! Vous recevrez bientôt nos actualités.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-grow">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Votre adresse email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          aria-label="Adresse email"
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                      </div>
                      <button
                        type="submit"
                        className="btn-primary whitespace-nowrap"
                      >
                        S'inscrire
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">
                      En vous inscrivant, vous acceptez notre politique de confidentialité. 
                      Vous pouvez vous désinscrire à tout moment.
                    </p>
                  </form>
                )}
              </div>
              
              <div className="hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1603570951358-98dd1ce26b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Newsletter" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
