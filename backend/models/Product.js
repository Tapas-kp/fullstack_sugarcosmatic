const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image : String,
    title : String,
    price : Number,
    discountPrice : Number,
    description : String,
    like:Boolean,
    shades:Array
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product