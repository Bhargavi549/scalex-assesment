const userModel = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
      try {
          const { username, password, email } = req.body;
          const existingEmail = await userModel.findByEmail(email)
          if (existingEmail) {
              return res.status(400).json({ message: "email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = {
              username,
              password: hashedPassword,
              email
          }
          await userModel.createUser(newUser)
          res.status(201).json({ message: "user registration successfull" })
      } catch (error) {
          console.log("Error during registration", err);
          res.status(500).json("Internal server error")
      }
  },
  login: async (req, res) => {
      try {
          const { email, password } = req.body;

          if (!email || !password) {
              return res.status(400).json({ message: 'email and password are required' });
          }

          const user = await userModel.authenticate(email, password);
          if (!user) {
              return res.status(401).json({ message: 'Invalid email or password' });
          }
          token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, {
              expiresIn: 3600,
          });

          res.status(200).json({ message: 'Login successful', email: user.email, token });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
      }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json({data: users });
    } catch (err) {
      console.log("error occured:", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
  deleteUser: async (req, res) => {
    const {email} = req.body;
    try {
      const deletedEmail = await userModel.deleteUserByEmail(email);
    if (deletedEmail) {
      res.status(200).send({ message: 'email deleted successfully' });
    } else {
      res.status(404).send({ error: 'email not found' });
    }
    } catch (err) {
      res.status(500).json({ message: "someting went wrong", err });
    }
  }
  
}

module.exports = userController;