import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, userProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/profile', authenticate, userProfile);

export default router;
