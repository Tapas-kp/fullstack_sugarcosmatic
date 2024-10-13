const Product = require("../models/Product");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");


exports.wishlistAdd =async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id; 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingWishlist = await Wishlist.findOne({ user: userId });
        if (existingWishlist && existingWishlist.items.includes(id)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }
        if (!existingWishlist) {
            const newWishlist = new Wishlist({
                user: userId,
                items: [id]
            });
            await newWishlist.save();
        } else {
            existingWishlist.items.push(id);
            await existingWishlist.save();
        }
        product.like = true;
        await product.save();
        res.status(200).json({ message: 'Product added to wishlist successfully' });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.wishlistRemove = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist || !wishlist.items.includes(id)) {
            return res.status(400).json({ message: 'Product not found in wishlist' });
        }
        wishlist.items = wishlist.items.filter(item => item.toString() !== id);
        await wishlist.save();
        product.like = false;
        await product.save();
        res.status(200).json({ message: 'Product deleted from wishlist successfully' });
    } catch (error) {
        console.error('Error deleting product from wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.wishlistProducts =async (req, res) => {
    try {
        const userId = req.user.id; 
        const wishlist = await Wishlist.findOne({ user: userId }).populate('items');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        res.status(200).json({ wishlist });
    } catch (error) {
        console.error('Error getting wishlist data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}