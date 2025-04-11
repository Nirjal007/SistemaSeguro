const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required: true,
            unique: true,
        },
        password:{
            type:String,
            required: true,
        },
        roles: {
            type:[String],
            required: true,
            default: ["Admin", "Manufacturer", "Retailer", "Supplier", "Distributor"], //  Allow multiple roles
            enum: ["Admin", "Manufacturer", "Retailer", "Supplier", "Distributor"],
        },
        companyName: {
            type:String,
            required: true,
        },
        storeName: {
            type:String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        twoFAEnabled: { 
            type: Boolean, 
            default: false ,
        }, // New field to check if 2FA is enabled
        twoFACode: {
            type: String,
        }, //  Stores OTP for verification (optional, can use  for temp storage)
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", userSchema);