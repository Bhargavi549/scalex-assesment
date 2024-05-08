const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { isAdmin } = require('../middlewares/authMiddleware');

router.post('/addBook',isAdmin, bookController.addBook);

router.delete('/deleteBook/:id', bookController.deleteBook);

module.exports = router;

