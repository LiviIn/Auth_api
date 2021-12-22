const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPlace: {
        type: String,
        required: true
    },
    productimage:{
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    districtName: {
        type: String,
        required: true
    },
    stateName: {
        type: String,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    price: {
        type: String,
    },
    liked: {
        trpe: Boolean,
    },
    count: {
        type: String,
    }
})

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;