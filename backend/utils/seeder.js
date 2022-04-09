const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

const products = require('../data/products.json');

// Setting dotenv file
dotenv.config({ path: 'config/config.env'})

connectDB();

const seedProducts = async (req, res, next) => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added');

        process.exit();
    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}
// seedProducts();
