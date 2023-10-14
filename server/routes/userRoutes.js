const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
//NOTE - in this way you can put multiple endpoint
router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

// router.route('/').get(allUsers)

module.exports = router;
