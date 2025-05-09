import React, { createContext, useState, useEffect, useContext } from 'react';
import { userService } from '../services/api';

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Effet pour charger le profil utilisateur au démarrage si un token existe
  useEffect(() => {
    const loadUserProfile = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await userService.getProfile();
          setCurrentUser(response.data.data.user);
        } catch (err) {
          console.error('Erreur lors du chargement du profil:', err);
          // Si le token est invalide ou expiré, déconnecter l'utilisateur
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [token]);

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.register(userData);
      const { token, data } = response.data;
      
      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.login(credentials);
      const { token, data } = response.data;
      
      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email ou mot de passe incorrect.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  };

  // Fonction de mise à jour du profil
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.updateProfile(userData);
      setCurrentUser(response.data.data.user);
      return { success: true, user: response.data.data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du profil.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de changement de mot de passe
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError('');
      await userService.changePassword(passwordData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue lors du changement de mot de passe.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Valeur du contexte
  const value = {
    currentUser,
    token,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
