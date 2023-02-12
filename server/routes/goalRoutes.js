import express from 'express';
import { getGoals, updateGoals, deleteGoals, allGoals, setGoals } from '../controllers/goalController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(allGoals).post(authenticate, setGoals);

router.get('/myGoals', authenticate, getGoals);

router.route('/:id').delete(authenticate, deleteGoals).put(authenticate, updateGoals);

export default router;
