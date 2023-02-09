import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.PUBLIC_KEY_JWT, {});
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // CHECK IF USER EXIST
  const userIsExists = await userModel.findOne({ email });
  if (userIsExists) {
    res.status(400);
    throw new Error('That email has already registered');
  }

  // PASSWORD HASHING
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await userModel.create({ name, email, password: hashedPass });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.redirect('/api/users/profile');
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.send('get one user');
});

const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export { registerUser, loginUser, getUser, updateUser };
