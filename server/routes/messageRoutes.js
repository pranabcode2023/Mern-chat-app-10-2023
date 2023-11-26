const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");

//message route
router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessages);

//NOTE - another method
// router.route("/").post(protect, sendMessage);
// router.route("/:chatId").get(protect, allMessages);

module.exports = router;
