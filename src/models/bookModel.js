const knex = require('../knexfile');

class Book {
  static async create(title, author, publication_year) {
    try {
      const [newBookId] = await knex('books').insert({ title, author, publication_year });
      const newBook = await knex('books').where('id', newBookId).first();
      return newBook;
    } catch (error) {
      throw new Error('Failed to create book');
    }
  }

  static async delete(id) {
    try {
      await knex('books').where('id', id).del();
    } catch (error) {
      throw new Error('Failed to delete book');
    }
  }
}

module.exports = Book;
