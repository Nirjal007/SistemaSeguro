
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    retailerEmail: { type: String, required: true },
    productName: { type: String, required: true },
    productMaterial: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: 'Pending' },  // Default order status
    supplierEmail: { type: String, required: false },  // Supplier email when accepted
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
