// https://www.npmjs.com/package/express-async-handler/v/1.1.4
// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers.
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
// import user model
import User from "../models/userModel.js";

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find the user matching the email address
  const user = await User.findOne({ email });

  // if the user exists and the password matches
  if (user && (await user.matchPassword(password))) {
    // return user data and token containing user id
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    // send and error if user exists
    res.status(400);
    throw new Error("User already exists");
  }

  // create and save a new user
  const user = await User.create({ name, email, password });

  // if the user was successfull created, return as json
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // the user is added to the request object by the authMiddleware
  const user = await User.findById(req.user._id);

  // check for the user and return as json if exists
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile };
