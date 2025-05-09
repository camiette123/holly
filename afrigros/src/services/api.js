import axios from 'axios';

// Création d'une instance axios avec l'URL de base de l'API
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services pour les utilisateurs
export const userService = {
  register: (userData) => API.post('/users/register', userData),
  login: (credentials) => API.post('/users/login', credentials),
  getProfile: () => API.get('/users/profile'),
  updateProfile: (userData) => API.put('/users/profile', userData),
  changePassword: (passwordData) => API.put('/users/password', passwordData),
};

// Services pour les produits
export const productService = {
  getAllProducts: (params) => API.get('/products', { params }),
  getProductById: (id) => API.get(`/products/${id}`),
  createProduct: (productData) => {
    const formData = new FormData();
    
    // Ajouter les champs textuels
    Object.keys(productData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, productData[key]);
      }
    });
    
    // Ajouter l'image si elle existe
    if (productData.image) {
      formData.append('image', productData.image);
    }
    
    return API.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateProduct: (id, productData) => {
    const formData = new FormData();
    
    // Ajouter les champs textuels
    Object.keys(productData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, productData[key]);
      }
    });
    
    // Ajouter l'image si elle existe
    if (productData.image) {
      formData.append('image', productData.image);
    }
    
    return API.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteProduct: (id) => API.delete(`/products/${id}`),
  searchProducts: (query) => API.get('/products/search', { params: { query } }),
};

// Services pour les catégories
export const categoryService = {
  getAllCategories: () => API.get('/categories'),
  getCategoryById: (id) => API.get(`/categories/${id}`),
  getCategoryProducts: (id) => API.get(`/categories/${id}/products`),
  createCategory: (categoryData) => API.post('/categories', categoryData),
  updateCategory: (id, categoryData) => API.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => API.delete(`/categories/${id}`),
};

// Services pour les commandes
export const orderService = {
  createOrder: (orderData) => API.post('/orders', orderData),
  getUserOrders: () => API.get('/orders'),
  getOrderById: (id) => API.get(`/orders/${id}`),
  cancelOrder: (id) => API.put(`/orders/${id}/cancel`),
};

// Services pour les avis
export const reviewService = {
  getProductReviews: (productId) => API.get(`/reviews/product/${productId}`),
  getUserReviews: () => API.get('/reviews/user/me'),
  createReview: (reviewData) => API.post('/reviews', reviewData),
  updateReview: (id, reviewData) => API.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => API.delete(`/reviews/${id}`),
};

export default API;
