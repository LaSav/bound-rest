const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register new User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if User exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileCompleted: false,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profileCompleted: user.profileCompleted,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User data');
  }

  res.json({ message: 'Register User' });
});

// @desc Authenticate a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for User email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      profileCompleted: user.profileCompleted,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc Edit User Profile
// @route PUT /api/users/me
// @access Private
const editMe = asyncHandler(async (req, res) => {
  const { name, email, bio, offeredSkill, portfolio } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check if profile is completed
  if (!user.profileCompleted && (!bio || !offeredSkill || !portfolio)) {
    res.status(400);
    throw new Error('Please add fields for bio, skill and portfolio');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.bio = bio || user.bio;
  user.offeredSkill = offeredSkill || user.offeredSkill;
  user.portfolio = portfolio || user.portfolio;
  user.profileCompleted = true;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

// May need to use Postmark for MFA
// @desc Delete User Profile
// @route DELETE /api/users/me
// @access Private
const deleteMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();

  res.status(200).json({ message: 'User successfully deleted' });
});

// @desc Get User by ID
// @route GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -email');
  res.status(200).json(user);
});
module.exports = { registerUser, loginUser, getMe, editMe, deleteMe, getUser };
