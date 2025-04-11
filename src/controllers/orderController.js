// controllers/orderController.js
const Order = require('../models/orderModel');

// Place a new order (Retailer)
exports.placeOrder = async (req, res) => {
    const { productName, productMaterial, quantity, retailerEmail } = req.body;
    
    try {
        const newOrder = new Order({
            retailerEmail,
            productName,
            productMaterial,
            quantity,
            status: 'Pending',  // Order status is set to 'Pending'
        });
        
        const savedOrder = await newOrder.save();
        res.json({ message: 'Order placed successfully!', order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error });
    }
};
// Get all pending orders for Supplier
exports.getPendingOrders = async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: 'Pending' });
        if (!pendingOrders || pendingOrders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' });
        }
        res.json(pendingOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Update order status (Accept/Reject) by Supplier
exports.updateOrderStatus = async (req, res) => {
    const { orderId, status, supplierEmail } = req.body;
    
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order status and supplier email
        order.status = status;
        order.supplierEmail = supplierEmail;
        await order.save();
        
        res.json({ message: `Order ${status}`, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status', error });
    }
};

