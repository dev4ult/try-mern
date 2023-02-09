import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const getUser = asyncHandler(async (req, res) => {
  res.send('get user');
});

const setUser = asyncHandler(async (req, res) => {
  res.send('post user');
});

const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

export { getUser, setUser, updateUser, deleteUser };
