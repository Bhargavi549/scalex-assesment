const knex = require("knex");
const config = require("../../config/config");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { json } = require("body-parser");

const db = knex(config.db);


  const createUser= async (user) => {
    try {
      const [userId, email] = await db("users").insert({
        username: user.username,
        email: user.email,
        password: user.password,
        otp:await generateOTP()
      })
      return { userId, email }
    } catch (error) {
      throw error
    }
  }
  const findByEmail= async (email) => {
    try {
      const user = await db("users").where({ email }).first();
      return user
    } catch (error) {
      throw error
    }
  }
  const findById= async (id) => {
    try {
      const userDetails = await db("users").where("id", id).first();
      return userDetails
    } catch (error) {
      throw error
    }
  }
  const getAllUsers= async () => {
    try {
      const user = await db("user").select('*')
      return user
    } catch (error) {
      throw error
    }
  }
  const authenticate= async (email, password) => {
    try {
      const user = await userModel.findByEmail(email);
      if (!user) {
        return null;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (err) {
      throw err;
    }
  }
  const deleteUserByEmail= async (email) => {
    try {
      const deleteuser = await db("users").where({ email }).del()
      return deleteuser
    } catch (error) {
      throw error
    }
  }
  const sendMail= async (email) => {
    try {
      const user = await db("users").where({ email }).first();
      let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: '',  //user email
          pass: ''   // user password
        }
      });
      let mailOptions = {
        from: '',    //sender mail
        to:user.email,      // receiver mail
        subject: 'otp verification',
        text: `otp for email verification is ${user.otp}`
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      throw error
    }
  }
  const verifyEmailOtp = async (email,otp) => {
    try {
      const user = await db("users").where({ email }).first()
      if (!user) {
        throw "email not found"
      }
      if (user.otp == otp) {
       const user =  await db("users").where({ id }).update({ isEmailverified: 1 });
        return user
      }else {
        throw "incorrect otp"
      }
    } catch (error) {
      throw error
    }
  }

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

module.exports = {createUser, deleteUserByEmail, findByEmail, getAllUsers,sendMail,findById,authenticate, verifyEmailOtp}
