const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplierController");

// Get all pending orders placed by retailers
router.get("/pending-orders", SupplierController.getPendingOrders);

// Accept or Reject an order
router.patch("/update-order-status", SupplierController.updateOrderStatus);

module.exports = router;
