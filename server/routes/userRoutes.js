import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/', loginUser);

router.get('/profile', getUser);

export default router;
