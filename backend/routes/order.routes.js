const express = require('express');
const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// Routes protégées (utilisateur connecté)
router.use(protect);
router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);

// Routes admin
router.use(restrictTo('admin'));
router.get('/admin/all', orderController.getAllOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/payment', orderController.updatePaymentStatus);

module.exports = router;
