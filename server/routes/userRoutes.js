const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//user routes
router.get("/", protect, allUsers);
router.post("/", registerUser);
router.post("/login", authUser);

//NOTE - another method
// router.route("/").get(protect, allUsers);
// router.route("/").post(registerUser);
// router.post("/login", authUser);

//NOTE - in this way you can put multiple endpoint
// router.route("/").post(registerUser).get(protect, allUsers);
// router.post("/login", authUser);

// router.route('/').get(allUsers)

module.exports = router;
