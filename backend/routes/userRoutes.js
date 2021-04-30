import express from "express";
const router = express.Router();
// all functionality is in controller file
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.route("/").post(registerUser);

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
router.post("/login", authUser);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// ================================
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
