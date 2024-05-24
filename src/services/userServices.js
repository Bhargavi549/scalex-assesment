const knex = require("knex");
const config = require("../../config/config");
const bcrypt = require('bcrypt');

const db = knex(config.db);

const userModel = {
  createUser: async (user)=>{
      try {
          const [userId] = await db("users").insert({
              username: user.username,
              email: user.email,
              password: user.password
          })
          return userId
      } catch (error) {
         throw error 
      } 
  },
  findByEmail: async (email)=>{
    try {
      const user = await db("users").where({email}).first();
      return user        
    } catch (error) {
      throw error
    }
  },
  findById: async (id)=>{
      try {
        const userDetails = await db("users").where("id",id).first();
        return userDetails  
      } catch (error) {
         throw error 
      }
  },
  getAllUsers: async ()=>{
      try {
         const user = await db("user").select('*') 
         return user
      } catch (error) {
        throw error  
      }
  },
  authenticate: async (email, password) => {
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
  },
  deleteUserByEmail: async (email)=>{
    try {
      const deleteuser = await db("user").where({ email }).del()
      return deleteuser
    } catch (error) {
      throw error
    }
  }
}
module.exports = userModel;
