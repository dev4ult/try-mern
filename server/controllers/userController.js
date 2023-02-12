import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
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

  const user = await userModel.create({
    name,
    email,
    password: hashedPass,
  });
  if (user) {
    const { name, email } = user;
    res.status(200).json({
      name,
      email,
      token: createToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ name: user.name, email, token: createToken(user._id) });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const userProfile = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export { registerUser, loginUser, userProfile, updateUser };
