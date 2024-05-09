const Book = require('../services/bookServices');
const User = require('../services/userServices');

const addBook = async (req, res) => {
  try {
    const { title, author, publicationYear, adminId } = req.body;

    if (typeof title !== 'string' || typeof author !== 'string') {
      return res.status(400).json({ message: 'Book Name and Author should be strings' });
    }
    console.log(".............", typeof publicationYear, typeof title, typeof author);
    if (typeof publicationYear !== 'number' || isNaN(publicationYear) || publicationYear < 0 || publicationYear > new Date().getFullYear()) {
      return res.status(400).json({ message: 'Publication year should be a valid number representing a year' });
    }
  
    const user = await User.findByUserId(adminId);
    if(!user) {
      return res.status(404).json({ message: 'user not found'})
    }
    
    if (user.userType !== 'admin') {
      return res.status(403).json({ message: 'Only admin users are allowed to add books' });
    }
    const book = await Book.findByBook(title);
    if (book) {
      return res.status(403).json({message: 'book name already exist'})
    }

    await Book.addBook(title, author, publicationYear);

    res.status(201).json({message: "Book added successfully" });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    if (!books) {
      return res.status(404).json({message: "data not found"})
    }
    res.status(200).json({data: books})
  } catch (error) {
    res.status(500).json({message: "something went wrong", error})
  }
}

const deleteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    const user = await User.findByUserId(userId);
    if(!user) {
      return res.status(404).json({ message: 'Invalid user'})
    }
    
    if (user.userType !== 'admin') {
      return res.status(403).json({ message: 'not allowed' });
    }

    await Book.deleteBook(bookId);

    res.status(200).json({message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "someting went wrong", err });
  }
};

module.exports = { addBook, getAllBooks, deleteBook,  };
