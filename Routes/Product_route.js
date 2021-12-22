const express = require('express');

const router = express.Router();

const ProductController = require('../Controllers/product_controller')
const store = require('../middleware/multer')

//GET a list of all Product
router.get('/', ProductController.getAllProduct );

//POST a Product
router.post('/post', store.single('productImage'), ProductController.createNewProduct)

//GET a product by id
router.get('/:id', ProductController.findProductById)

//Update a product by id
router.patch('/:id', ProductController.updateAProduct)

//Delete a product by id
router.delete('/:id', ProductController.deleteAProduct)

module.exports = router;