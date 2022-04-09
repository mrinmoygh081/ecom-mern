const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// CREATE new product => /api/v1/product/view
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// GET all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

// GET Single Product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        // return res.status(404).json({
        //     success: false,
        //     message: "Product not found"
        // })
        
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// UPDATE Product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        product
    })
})

// DELETE Product => /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // await Product.remove(); // Mongoose remove() is deprecated after v6.0. 
    await Product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
})