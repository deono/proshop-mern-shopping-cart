import express from 'express';
const router = express.Router();
// all functionality is in controller file
import { authUser } from '../controllers/userController.js';

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

export default router;
