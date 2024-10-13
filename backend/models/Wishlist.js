const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items:[{type :mongoose.Schema.Types.ObjectId, ref: "product"}]
})

const Wishlist =  mongoose.model("wishlist", WishlistSchema)

module.exports = Wishlist