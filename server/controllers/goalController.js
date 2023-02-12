import asyncHandler from 'express-async-handler';
import goalModel from '../models/goalModel.js';
import userModel from '../models/userModel.js';

const getGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.find({ user: req.user.id });

  if (!data) {
    res.status(400);
    throw new Error('unknown id selected');
  }

  res.status(200).json(data);
});

const allGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.find({}).populate('user');

  const goalData = data.map((goal) => {
    const { _id, text, createdAt } = goal;
    return { id: _id, user: goal.user.name, text, createdAt };
  });

  res.status(200).json(goalData);
});

const setGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add the text field');
  }

  await goalModel.create({
    user: req.user.id,
    text,
  });

  res.redirect('/api/goals');
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (req.user.id !== goal.user.toString()) {
    res.status(400);
    throw new Error('User not authorized');
  }

  const updateGoals = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log(updateGoals);

  res.redirect('/api/goals');
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (req.user.id !== goal.user.toString()) {
    res.status(400);
    throw new Error('User not authorized');
  }

  const result = await goalModel.findByIdAndRemove(req.params.id);

  console.log(result);

  res.redirect('/api/goals');
});

export { allGoals, getGoals, setGoals, updateGoals, deleteGoals };
