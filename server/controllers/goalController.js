import asyncHandler from 'express-async-handler';
import goalModel from '../models/goalModel.js';
import moment from 'moment/moment.js';

function getFormattedGoals(data) {
  return data.map((goal) => {
    const { _id, text, createdAt } = goal;
    const fd = moment(createdAt).format('Do MMMM  YYYY');
    return { id: _id, user: goal.user.name, text, createdAt: fd };
  });
}

const getGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.find({ user: req.user.id });

  const goalData = getFormattedGoals(data);

  res.status(200).json(goalData);
});

const allGoals = asyncHandler(async (req, res) => {
  const data = await goalModel.find({}).populate('user');

  const goalData = getFormattedGoals(data);

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

  const data = await goalModel.find({}).populate('user');

  const goalData = getFormattedGoals(data);

  res.status(200).json(goalData);
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

  await goalModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const data = await goalModel.find({ user: req.user.id });

  const goalData = getFormattedGoals(data);

  res.status(200).json(goalData);
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

  await goalModel.findByIdAndRemove(req.params.id);

  const data = await goalModel.find({ user: req.user.id });

  const goalData = getFormattedGoals(data);

  res.status(200).json(goalData);
});

export { allGoals, getGoals, setGoals, updateGoals, deleteGoals };
