import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js'; // add the .js extention when using ES Modules (import syntax)
import products from './data/products.js';

// dotenv
config();

// connect to the database
connectDB();

// initialize express
const app = express();

// default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// get list of products
app.get('/api/products', (req, res) => {
  // serve as json file
  res.json(products);
});

// get a single product
app.get('/api/products/:id', (req, res) => {
  const product = find(p => p._id === req.params.id);
  // serve as json file
  res.json(product);
});

const PORT = process.env.PORT || 5000;
// run the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
