import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Composants de mise en page
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddProductPage from './pages/AddProductPage';

// Styles
import './App.css';

function App() {
  const { loading } = useAuth();

  // Afficher un indicateur de chargement pendant que l'authentification est vérifiée
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/contact" element={<Contacts/>} /> 
            <Route path="/about" element={<Categories/>} /> 
            
            {/* Routes protégées (utilisateur connecté) */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <div>Mes commandes (à implémenter)</div>
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <div>Mon panier (à implémenter)</div>
              </ProtectedRoute>
            } />
            <Route path="/products/add" element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            } />
            
            {/* Routes protégées (admin uniquement) */}
            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly={true}>
                <div>Panneau d'administration (à implémenter)</div>
              </ProtectedRoute>
            } />
            
            {/* Route 404 */}
            <Route path="*" element={<div className="container-custom py-20 text-center"><h1 className="text-3xl font-bold mb-4">Page non trouvée</h1><p>La page que vous recherchez n'existe pas.</p></div>} />
          </Routes>
        </main>
        
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
