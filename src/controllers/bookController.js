const Book = require('../models/bookModel');

exports.addBook = async (req, res) => {
  try {
    const { title, author, publication_year } = req.body;
    const newBook = await Book.create(title, author, publication_year);
    res.status(200).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.delete(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
