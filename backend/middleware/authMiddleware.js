import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// middleware to authenticate the user and add to the request object
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from headers
      token = req.headers.authorization.split(" ")[1];
      // decode the token to the the user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // add the user to the request object, without the password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized. Invalid token.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. No token found.");
  }
});

const admin = (req, res, next) => {
  // if the user is logged in and an admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
};

export { protect, admin };
