const express = require('express');
const products = require('./data/products');

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

app.listen(5000, console.log('Server listining on port 5000'));
