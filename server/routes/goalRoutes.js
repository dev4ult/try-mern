import express from 'express';
import { getGoals, updateGoals, deleteGoals, allGoals, setGoals } from '../controllers/goalController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(authenticate, getGoals).post(authenticate, setGoals);

router.route('/:id').delete(authenticate, deleteGoals).put(authenticate, updateGoals);

export default router;
