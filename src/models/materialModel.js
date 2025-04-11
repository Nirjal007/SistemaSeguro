const mongoose = require('mongoose');

// Define the Material Schema
const materialSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productId: { type: String, required: true },
    productCode: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    manufacturingPlace: { type: String, required: true },
    manufacturingDate: { type: Date, required: true },
    productImage: { type: String, required: true }, // Path to the product image
    productDescription: { type: String, required: true },
    supplierEmail: { type: String, required: true }
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
