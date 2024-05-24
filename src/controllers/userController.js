const userServices = require('../services/userServices');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

  const register = async (req, res) => {
      try {
          const { username, password, email } = req.body;
          if (!(username || password || email)) {
            return res.status(401).json({message: "missing required fields"})
          }
          const existingEmail = await userServices.findByEmail(email)
          if (existingEmail) {
              return res.status(400).json({ message: "email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
          const newUser = {
              username,
              password: hashedPassword,
              email
          }
        await userServices.createUser(newUser)
          res.status(201).json({ message: "user registration successfull otp sent to mail please verify to activate" });
          await sendMail(email); 
      } catch (error) {
          console.log("Error during registration", error);
          res.status(500).json("Internal server error")
      }
  }
 const sendMail= async (email)=>{
    try {
      await userServices.sendMail(email)
    } catch (error) {
     throw error
    }
  }
  const login= async (req, res) => {
      try {
          const { email, password } = req.body;

          if (!email || !password) {
              return res.status(400).json({ message: 'email and password are required' });
          }

          const user = await userServices.authenticate(email, password);
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
  }
  const getAllUsers= async (req, res) => {
    try {
      const users = await userServices.getAllUsers();
      res.status(200).json({data: users });
    } catch (err) {
      console.log("error occured:", err);
      res.status(500).json({ err: "Internal server error" });
    }
  }
  const deleteUser= async (req, res) => {
    const {email} = req.body;
    try {
      const deletedEmail = await userServices.deleteUserByEmail(email);
    if (deletedEmail) {
      res.status(200).send({ message: 'email deleted successfully' });
    } else {
      res.status(404).send({ error: 'email not found' });
    }
    } catch (err) {
      res.status(500).json({ message: "someting went wrong", err });
    }
  }
  const verifyOtp = async (req, res) => {
    const {email, otp} = req.body;
    try {
      const userDetails = await userServices.verifyEmailOtp(email,otp);
    if (userDetails) {
      res.status(200).send({ message: 'email verification successfully' });
    } else {
      res.status(404).send({ error: 'user not found' });
    }
    } catch (err) {
      res.status(500).json({ message: "someting went wrong", err });
    }
  }


  

module.exports = { register,login,deleteUser,getAllUsers, sendMail, verifyOtp};
