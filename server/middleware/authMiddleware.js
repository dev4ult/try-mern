import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authenticate = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);

      req.user = await userModel.findById(payload.id).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('No token, Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('No token, Not authorized');
  }
});

export { authenticate };
