const express = require('express');
const categoryController = require('../controllers/category.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// Routes publiques
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getCategoryProducts);

// Routes protégées (admin seulement)
router.use(protect);
router.use(restrictTo('admin'));
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
