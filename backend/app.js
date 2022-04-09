const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error')

app.use(express.json());

// import all routes
const product = require('./routes/product');

app.use('/api/v1', product)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;