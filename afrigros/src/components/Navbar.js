import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary font-heading">AfriGro</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="font-medium hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/products" className="font-medium hover:text-primary transition-colors">
                Produits
              </Link>
              
              <Link to="/about" className="font-medium hover:text-primary transition-colors">
                À propos
              </Link>
              <Link to="/contact" className="font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">
                  {currentUser?.firstName || 'Utilisateur'}
                </span>
                <div className="relative group">
                  <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <UserIcon className="h-6 w-6" />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mon profil
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mes commandes
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-outline py-2 px-4">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary py-2 px-4">
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Produits
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Catégories
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 font-medium text-gray-700">
                  Bonjour, {currentUser?.firstName || 'Utilisateur'}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Mon Profil
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Mes Commandes
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 text-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="w-full text-center btn-outline py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center btn-primary py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
