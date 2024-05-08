const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User();

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingUser = await user.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists' });
    }

    await user.createUser(username, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User();

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const userData = await user.findByUsername(username);
    if (!userData) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await user.comparePasswords(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
