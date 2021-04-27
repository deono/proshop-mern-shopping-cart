// https://www.npmjs.com/package/express-async-handler/v/1.1.4
// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers.
import asyncHandler from 'express-async-handler';
// import user model
import User from '../models/userModel.js';
import { userInfo } from 'os';

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find the user matching the email address
  const user = await User.findOne({ email });

  // if the user exists and the password matches
  if (user && (await user.matchPassword(password))) {
    // return user data and token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
