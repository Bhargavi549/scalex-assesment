const bcrypt = require('bcrypt');
const knex = require('../knexfile');

class User {
  constructor() {
    this.tableName = 'users';
  }

  async findByUsername(username) {
    try {
      const user = await knex(this.tableName).where('username', username).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await knex(this.tableName).insert({ username, email, password: hashedPassword });
    } catch (error) {
      throw error;
    }
  }

  async comparePasswords(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
