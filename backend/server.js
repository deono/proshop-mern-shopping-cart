const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config();

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
  const product = products.find(p => p._id === req.params.id);
  // serve as json file
  res.json(product);
});

const PORT = process.env.PORT || 5000;
// run the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
