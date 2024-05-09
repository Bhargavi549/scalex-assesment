const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController')
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add', bookController.addBook)
router.get('/users', userController.getAllUsers)
router.get('/books', bookController.getAllBooks)
router.delete('/delete-book', bookController.deleteBook)
router.post('/home', homeController.getBooksData) 


module.exports = router;
