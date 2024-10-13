const express = require('express');
const { wishlistAdd, wishlistRemove, wishlistProducts } = require('../controllers/wishlistController');

const router = express.Router();

router.post('/add', wishlistAdd);

router.delete('/delete/:id',  wishlistRemove);

router.get('/',  wishlistProducts);

module.exports = router;