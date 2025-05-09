import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, PlusIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import ProductModal from '../components/products/ProductModal';
import { productService, categoryService } from '../services/api';
import { useAuth } from '../context/AuthContext';



// Les catégories seront chargées depuis l'API

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); // Utiliser le contexte d'authentification

  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = 'Produits - AfriGro';
    
    // Charger les produits depuis l'API
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getAllProducts();
        console.log('API Response:', response);
        
        // Les produits sont dans response.data.data.products selon la structure du backend
        let productsData = [];
        
        if (response.data && response.data.data && Array.isArray(response.data.data.products)) {
          productsData = response.data.data.products;
        } else if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        } else if (Array.isArray(response.data)) {
          productsData = response.data;
        }
        
        console.log('Processed Products Data:', productsData);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
        setIsLoading(false);
      }
    };
    
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        console.log('Categories API Response:', response);
        
        // Les catégories sont dans response.data.data.categories selon la structure du backend
        let categoriesData = [];
        
        if (response.data && response.data.data && Array.isArray(response.data.data.categories)) {
          categoriesData = response.data.data.categories;
        } else if (response.data && Array.isArray(response.data.categories)) {
          categoriesData = response.data.categories;
        } else if (Array.isArray(response.data)) {
          categoriesData = response.data;
        }
        
        console.log('Processed Categories Data:', categoriesData);
        
        // Ajouter un compteur de produits pour chaque catégorie
        const categoriesWithCount = categoriesData.map(category => ({
          ...category,
          count: 0 // Sera mis à jour après avoir chargé les produits
        }));
        
        setCategories(categoriesWithCount);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };
    
    // Charger les données
    fetchCategories();
    fetchProducts();
    
    // L'authentification est gérée par le contexte d'authentification
  }, []);

  // Filtrer les produits en fonction des critères
  useEffect(() => {
    let result = [...products];
    
    // Filtrer par recherche
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrer par catégorie
    if (selectedCategory) {
      result = result.filter(product => product.categoryId === parseInt(selectedCategory));
    }
    
    // Filtrer par prix
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Trier les produits
    if (sortBy === 'newest') {
      // Dans une application réelle, vous utiliseriez la date de création
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Catalogue de Produits</h1>
            <p className="text-gray-600">
              Découvrez notre sélection de produits authentiques africains
            </p>
          </div>
          
          {isAuthenticated && (
            <Link 
              to="/products/add" 
              className="mt-4 md:mt-0 btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Ajouter un produit
            </Link>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtres pour desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
            />
          </div>
          
          <div className="flex-grow">
            {/* Barre de recherche et filtres */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={toggleFilter}
                    className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                  >
                    <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Filtres
                  </button>
                  
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="newest">Plus récents</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                  </select>
                </div>
              </div>
              
              {/* Filtres pour mobile */}
              {isFilterOpen && (
                <div className="lg:hidden mt-4 border-t pt-4">
                  <ProductFilter 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    priceRange={priceRange}
                    onCategoryChange={handleCategoryChange}
                    onPriceChange={handlePriceChange}
                  />
                </div>
              )}
            </div>
            
            {/* Résultats de recherche */}
            {error ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Réessayer
                </button>
              </div>
            ) : isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-600 mb-4">Aucun produit ne correspond à vos critères de recherche.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                        setPriceRange([0, 1000]);
                        setSortBy('newest');
                      }}
                      className="btn-outline"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => {
                      // Trouver la catégorie correspondante pour l'affichage
                      const category = categories.find(cat => cat.id === product.categoryId);
                      
                      // Préparer les données du produit pour l'affichage
                      const displayProduct = {
                        ...product,
                        // Utiliser l'URL de l'image du produit ou une image par défaut
                        image: product.imageUrl 
                          ? `http://localhost:3000${product.imageUrl}` 
                          : (product.id == 1 ? 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
                            : product.id == 2 ? 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
                            : product.id == 3 ? 'https://images.unsplash.com/photo-1606791405792-1004f1d5e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
                            : 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'),
                        // Ajouter le nom de la catégorie pour l'affichage
                        categoryName: category ? category.name : 'Catégorie inconnue',
                        // Ajouter une note par défaut si elle n'existe pas
                        rating: product.rating || 5.0
                      };
                      
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <ProductCard 
                            product={displayProduct} 
                            onClick={() => handleProductClick(displayProduct)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de détail de produit */}
      {selectedProduct && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
