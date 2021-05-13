import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   GET /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    // create a new order in the database
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    // save the order
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // fetch the order from the database
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  // check if order exists
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // fetch the order from the database
  const order = await Order.findById(req.params.id);

  // check if order exists
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // paymentResult fields come PayPal API response
    // Other information might be added if using a different payment gateway
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // save the order in the database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
