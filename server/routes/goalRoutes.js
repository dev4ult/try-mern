import express from 'express';
import { getGoals, postGoals } from '../controllers/goalController.js';

const router = express.Router();

router.route('/').get(getGoals).post(postGoals);

export default router;
