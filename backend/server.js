import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'; // add the .js extention when using ES Modules (import syntax)

// routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// dotenv
config();

// connect to the database
connectDB();

// initialize express
const app = express();

// parse json data in the request body
app.use(express.json());

// default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// use middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
