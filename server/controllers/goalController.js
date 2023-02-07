import asyncHandler from 'express-async-handler';
import goalModel from '../models/goalModel.js';

const getGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error('unknown id selected');
  }

  res.status(200).json({ data });
});

const allGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.find({});
  res.status(200).json({
    data,
  });
});

const postGoals = asyncHandler(async (req, res) => {
  const text = req.body.text;

  if (!text) {
    res.status(400);
    throw new Error('Please add the text field');
  }

  await goalModel.create({ text });

  res.redirect('/api/goals');
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('unknown goals id');
  }

  const updatedGoals = await findByIdAndUpdate(res.params.id, req.body, {
    new: true,
  });

  console.log(updateGoals);

  res.redirect('/api/goals');
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('unknown goals id');
  }

  const result = await goalModel.findByIdAndRemove(id);

  console.log(result);

  res.redirect('/api/goals');
});

export { allGoals, getGoals, postGoals, updateGoals, deleteGoals };
