const app = require('./app');
const connectDB = require('./config/database')
const dotenv = require('dotenv');

//Setting up config file path (I think direct from packages to .env file)
dotenv.config({ path: 'config/config.env'})

// Connecting to database
connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})