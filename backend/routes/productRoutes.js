import express from 'express';
// https://www.npmjs.com/package/express-async-handler/v/1.1.4
// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers.
import asyncHandler from 'express-async-handler';
const router = express.Router();
// import product model
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // serve as json file
    res.json(products);
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error(`Product not found`);
    }
  })
);

export default router;
