import express from 'express';
import { registerUser, loginUser, getProfile, getAllUsers } from '../controllers/userController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import adminMiddleware from '../middlewares/adminMiddleware.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.get('/all', authMiddleware, adminMiddleware, getAllUsers); // Admin-only route

export default router;