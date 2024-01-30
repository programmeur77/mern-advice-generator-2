import bcrypt from 'bcrypt';

import User from './../models/user-model.js';

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    res.status(400).json({ error: 'Impossible to hash password', status: 400 });
  }

  const user = new User({
    email,
    password: hashedPassword,
  });

  const createdUser = await user.save();

  if (!createdUser) {
    res.status(400).json({ error: 'Impossible to create user', status: 400 });
  }

  res.status(201).json({ success: 'User created', status: 201 });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ error: 'Invalid email or password', status: 404 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(404).json({ error: 'Invalid email or password', status: 404 });
  }

  res.status(200).json({ user: user, token: 'TOKEN', status: 200 });
};
