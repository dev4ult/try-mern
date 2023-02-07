import express from 'express';
import { getGoals, postGoals, updateGoals, deleteGoals, allGoals } from '../controllers/goalController.js';

const router = express.Router();

router.route('/').get(allGoals).post(postGoals);

router.route('/:id').get(getGoals).delete(deleteGoals).put(updateGoals);

export default router;
