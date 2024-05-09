const knex = require("knex");
const config = require("../../config/config");
const bcrypt = require('bcrypt');

const db = knex(config.db);

const User = {
  createUser: async (user) => {
    try {
      const [userId] = await db("users").insert({
        username: user.username,
        email: user.email,
        password: user.password,
        userType: user.userType
      });
      return userId; 
    } catch (err) {
      throw err;
    }
  },
  findByUsername: async (username) => {
    try {
      const user = await db('users').where({ username }).first();
      return user; 
    } catch (err) {
      throw err;
    }
  },
  findByUserId: async (id) =>{
    try {
     const userDetails = await db('users').where('id',id).first();
    return userDetails
    } catch (error) {
      throw error
    }
  },
  getAllUsers : async () =>{
    try {
      const user = await db('users').select('*')
      return user;
    } catch (error) {
      throw error;
    }
  },
  authenticate: async (username, password) => {
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }

      // Omitting password before returning the user
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = User;
