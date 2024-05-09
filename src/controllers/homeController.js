const { getBooksForAdmin, getBooksForUser } = require("../services/homeSerives");
const User = require("../services/userServices");


const getBooksData = async(req,res) => {
    try {
        console.log("user....", req.body,req.files)
        const {userId} = req.body;
        const userDetails = await User.findByUserId(4);
        
        if (!userDetails) {
          res.status(403).json({message: 'user not found'})
        }
        if (userDetails.userType === 'admin') {
            const data = await getBooksForAdmin(req);
            res.status(200).json({data})
        }
        if (userDetails.userType === 'regular') {
           const data = await getBooksForUser(req);
           res.status(200).json({data})
        }
    } catch (error) {
        throw error
    }
}
module.exports = {getBooksData};
