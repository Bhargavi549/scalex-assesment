const User = require('../services/userServices');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json({data: users });
    } catch (err) {
      console.log("error occured:", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
};

module.exports = userController;