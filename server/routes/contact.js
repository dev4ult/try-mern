import express from 'express';

const router = express.Router();

router.get('/contact', (req, res) => {
  res.send('Contact page');
});

export default router;
