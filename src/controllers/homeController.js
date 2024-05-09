const { getBooksForAdmin, getBooksForUser } = require("../services/homeSerives");
const User = require("../services/userServices");
const fs = require('fs');


const getBooksData = async (req, res) => {
    try {
        const { userId } = req.body;
        const userDetails = await User.findByUserId(userId);

        if (!userDetails) {
            res.status(403).json({ message: 'user not found' })
        }
        let regularBookNames = [];

        // Read regular user books
        const regularBooks = fs.readFileSync('regularUser.csv', 'utf8').split('\n');
        regularBookNames = regularBooks.map(book => book.split(',')[0]);

        // If user is admin, read admin user books and append to regular books list
        if (userDetails.userType === 'admin') {
            const adminBooks = fs.readFileSync('adminUser.csv', 'utf8').split('\n');
            const adminBookNames = adminBooks.map(book => book.split(',')[0]);
            regularBookNames = regularBookNames.concat(adminBookNames);
        }

        res.status(200).json({data: regularBookNames })
    } catch (error) {
        throw error
    }
}
module.exports = { getBooksData };
