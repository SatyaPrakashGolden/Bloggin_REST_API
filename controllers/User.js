const bcryptjs = require('bcryptjs');
const User = require('../models/user.js');
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in login' });
  }
};
const postUser = async (req, res) => {
  const { name, email, password } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      blog: [],
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error in posting' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const logout = ((req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Logout failed' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  } else {
    res.status(401).json({ message: 'You are not logged in' });
  }
});
const findById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { getAllUsers, postUser, deleteUser, findById, loginUser, logout };
