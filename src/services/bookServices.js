const knex = require('knex');
const config = require("../../config/config");

const db = knex(config.db)

// const addBook = async (title, author, publicationYear) => {
//   try {
//     const [bookId] = await db("books").insert({
//       title,
//       author,
//       publicationYear
//     });
//     return bookId;
//   } catch (err) {
//     throw err;
//   }
// };
const getAllBooks = async () => {
  try {
    const books = await db('books').select('*')
    return books
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (bookId) => {
  try {
   return await db("books").where('id', bookId).del();
   
  } catch (err) {
    throw err;
  }
};

const findByBook = async (title) => {
  try {
   return await db("books").where({title}).first();
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllBooks, deleteBook, findByBook };
