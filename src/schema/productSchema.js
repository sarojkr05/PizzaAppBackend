const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: [true, "Product name is required"],
        trim: true,
        minlength: [5, "Product name must be at least 5 character long"],
        maxlength: [25, "Product name must be less than 25 character longer"]
    },
    description: {
        type: String,
        trim: true,
        minlength: [5, "Product description must be at least 5 character long"],
    },
    productImage: {
        type: String,
    },
    price: {
        type: Number,
        require: [true, "Proce is required"],
        trim: true,
    },
    category: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Drinks', 'Sides'],
        default: 'Veg'
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock status is required"],
        default: true,
    },
    aboutProduct: {
        type: String,
        trim: true,
        minlength: [5, "About product must be at least 5 character long"],
        maxlength: [20, "About product must be less than 25 character longer"]

    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema); //Collection
module.exports = Product;