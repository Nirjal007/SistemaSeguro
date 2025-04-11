// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order (Retailer)
router.post('/place-order', orderController.placeOrder);

// Get pending orders for Supplier
router.get('/pending-orders', orderController.getPendingOrders);

// Update order status (Accept/Reject) by Supplier
router.patch('/update-order-status', orderController.updateOrderStatus);

module.exports = router;
