import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Composant de route protégée qui vérifie si l'utilisateur est authentifié
 * Si l'utilisateur est authentifié, le composant enfant est rendu
 * Sinon, l'utilisateur est redirigé vers la page de connexion
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Si l'authentification est en cours de chargement, afficher un indicateur de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la route est réservée aux administrateurs et que l'utilisateur n'est pas un administrateur
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur est authentifié, rendre le composant enfant
  return children;
};

export default ProtectedRoute;
