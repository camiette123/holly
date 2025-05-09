import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary font-heading">AfriGro</span>
            </Link>
            <p className="text-gray-300 mt-2">
              Votre marché africain en ligne. Découvrez des produits authentiques et soutenez les artisans locaux.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary transition-colors">Produits</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-primary transition-colors">Catégories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/electronique" className="text-gray-300 hover:text-primary transition-colors">Électronique</Link>
              </li>
              <li>
                <Link to="/categories/vetements" className="text-gray-300 hover:text-primary transition-colors">Vêtements</Link>
              </li>
              <li>
                <Link to="/categories/maison" className="text-gray-300 hover:text-primary transition-colors">Maison</Link>
              </li>
              <li>
                <Link to="/categories/alimentation" className="text-gray-300 hover:text-primary transition-colors">Alimentation</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Abomey-Calavie Rue du Commerce,Bénin</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📱</span>
                <span>+229 01 47349664 /+229 01 56601457</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <a href="mailto:contact@afrigro.com" className="text-gray-300 hover:text-primary transition-colors">
                  contact@afrigro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} AfriGro. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-400">
                <li>
                  <Link to="/terms" className="hover:text-primary transition-colors">Conditions d'utilisation</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
