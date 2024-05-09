const User = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, email, userType } = req.body;
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username,
        password: hashedPassword,
        email,
        userType
      };
     await User.createUser(newUser);
      res.status(201).json({ message: "User registration successful" });
    } catch (err) {
      console.log("Error during registration:", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await User.authenticate(username, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 3600,
      });

      res.status(200).json({ message: 'Login successful', username: user.username, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;