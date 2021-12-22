const createError = require('http-errors'); //use to error handling
const mongoose = require('mongoose'); // mongoose connection

const Product = require('../Models/product_model'); //poduct models

const path = require('path')

//Get the all product
exports.getAllProduct = async (req, res, next) =>{
        try {
            const results = await Product.find({}, {__v: 0});
            // const results = await Product.find({}, {name: 1, price: 1, _id: 0});
            // const results = await Product.find({price: 699}, {});
            res.send(results);

            // console.log(results)
        } catch (error) {
            console.log(error.message);
        }
    },

// POST Create a new Product
exports.createNewProduct = async (req, res, next) => {
        try {
            const url = req.protocol + '://' + req.get("host");
            // console.log(url)
            const product = new Product({
                productName: req.body.productName,
                productCategory: req.body.productCategory,
                productPlace:  req.body.productPlace,
                // productimage: req.file.path,
                productimage: url + "/" + req.file.path,
                productDescription: req.body.productDescription,
                districtName: req.body.districtName,
                stateName: req.body.stateName,
                countryName: req.body.countryName,
                price: req.body.price,
                liked: req.body.liked,
                count: req.body.count,
                id: req.user
            }) ;
            // console.log(url + "/" + req.file.path)
            const result = await product.save();
            // res.send(result);
            res.status(201).json({
                message: " Post added successfullly",
                product: {
                    ...result,
                    id: result._id
                }
            })
            
        } catch (error) {
            // console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
              }
              next(error);
        }
        
        // const Product = new ProductModels({
        //     name: req.body.name,
        //     price: req.body.price
        // })
        // Product.save().then((result) => {
        //     console.log(result)
        //     res.send(result)
        // }).catch(err => {
        //     console.log(err.message);
        // })
    },

// GET product by ID
exports. findProductById =  async (req, res, next) =>{
        const id = req.params.id;
        try {
            // const product = await Product.findOne({_id: id})
            const product = await Product.findById(id);
            if(!product){
                throw createError(404, 'Product does not exist..')
            }
            res.send(product)
            console.log(product)
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Product id'));
                return;
              }
            next(error);
        }
    },
// PATCH updating a product
exports.  updateAProduct = async (req, res, next) =>{
        try {
            const id = req.params.id;
            const Update = req.body;
            const option = { new: true }
            const result = await Product.findByIdAndUpdate(id, Update, option);
            if(!result){
                throw createError(404, 'Product does not exist..')
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Product id'));
                return;
              }
              next(error);
        }
    },
// DELETE A Product..
exports.deleteAProduct = async (req, res, next) =>{
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id);
            if(!result){
                throw createError(404, 'Product does not exist..')
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Product id'));
                return;
              }
            next(error);
        }
    }
