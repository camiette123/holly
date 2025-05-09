const express = require('express');
const reviewController = require('../controllers/review.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// Routes publiques
router.get('/product/:productId', reviewController.getProductReviews);
router.get('/:id', reviewController.getReviewById);

// Routes protégées (utilisateur connecté)
router.use(protect);
router.post('/', reviewController.createReview);
router.get('/user/me', reviewController.getUserReviews);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
