const Order = require("../models/orderModel");

exports.getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Pending" });  // Get only orders with "Pending" status
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        // Find the order by its ID and update the status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: `Order ${status}`, updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating order status", error });
    }
};
