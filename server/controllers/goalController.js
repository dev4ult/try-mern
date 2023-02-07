import asyncHandler from 'express-async-handler';
import goalModel from '../models/goalModel.js';

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    alert: 'get goals',
  });
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add the text field');
  } else {
    res.status(200).json({
      alert: 'post goals',
    });
  }
});

const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    alert: 'put goals',
  });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    alert: 'delete goals',
  });
});

export { getGoals, postGoals, putGoals, deleteGoals };
