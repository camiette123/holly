import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ShoppingCartIcon, StarIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  // Données factices pour les avis
  const reviews = [
    {
      id: 1,
      user: 'Sophie Martin',
      rating: 5,
      date: '12 avril 2025',
      comment: 'Excellent produit, je suis très satisfaite de mon achat. La qualité est au rendez-vous et la livraison a été rapide.'
    },
    {
      id: 2,
      user: 'Pierrette ASSOGBA',
      rating: 4,
      date: '5 avril 2025',
      comment: 'Bon produit, conforme à la description. Seul bémol : l\'emballage était légèrement endommagé à l\'arrivée.'
    }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    console.log('Ajouter au panier:', { product, quantity });
    // Logique pour ajouter au panier
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    className="rounded-full bg-white p-2 hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <XIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image du produit */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 md:h-96 object-cover rounded-lg"
                    />
                    <button
                      onClick={toggleFavorite}
                      className={`absolute top-4 right-4 p-2 rounded-full ${
                        isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
                      }`}
                    >
                      <HeartIcon className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-primary text-secondary-dark text-sm font-bold px-3 py-1 rounded">
                      {product.categoryName || 'Catégorie'}
                    </div>
                  </div>

                  {/* Détails du produit */}
                  <div>
                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                      {product.name}
                    </Dialog.Title>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.rating}) · {reviews.length} avis
                      </span>
                    </div>
                    
                    <p className="text-2xl font-bold text-gray-900 mt-4">
                      {product.price.toFixed(2)} €
                    </p>
                    
                    <div className="mt-6">
                      <div className="flex items-center space-x-4">
                        <p className="text-gray-700">Quantité:</p>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={decrementQuantity}
                            className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-12 text-center py-1 focus:outline-none"
                          />
                          <button
                            onClick={incrementQuantity}
                            className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4 mt-6">
                        <button
                          onClick={addToCart}
                          className="flex-1 btn-primary flex items-center justify-center"
                        >
                          <ShoppingCartIcon className="h-5 w-5 mr-2" />
                          Ajouter au panier
                        </button>
                        <button
                          className="flex-1 btn-outline flex items-center justify-center"
                        >
                          Acheter maintenant
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t pt-6">
                      <p className="text-sm text-gray-500">
                        Vendu par: <span className="font-medium">
                          {product.User ? `${product.User.firstName} ${product.User.lastName}` : 'Vendeur'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Disponibilité: <span className="text-green-600 font-medium">En stock</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Onglets d'information */}
                <div className="mt-8 border-t pt-6">
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'description'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'reviews'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      Avis ({reviews.length})
                    </button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="py-4"
                    >
                      {activeTab === 'description' ? (
                        <div>
                          <p className="text-gray-700">{product.description}</p>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="font-medium">Catégorie:</span> {product.categoryName || 'Catégorie'}
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="font-medium">Marque:</span> Exemple
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="font-medium">Origine:</span> Afrique
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <span className="font-medium">Livraison:</span> 2-3 jours ouvrés
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {reviews.length > 0 ? (
                            <div className="space-y-4">
                              {reviews.map((review) => (
                                <div key={review.id} className="border-b pb-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">{review.user}</p>
                                      <div className="flex items-center mt-1">
                                        {[...Array(5)].map((_, i) => (
                                          <StarSolidIcon
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                  </div>
                                  <p className="mt-2 text-gray-700">{review.comment}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">Aucun avis pour ce produit.</p>
                          )}
                          
                          <button className="mt-4 text-primary font-medium hover:text-primary-dark transition-colors">
                            Écrire un avis
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
