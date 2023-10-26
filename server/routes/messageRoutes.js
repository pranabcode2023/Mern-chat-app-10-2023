const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// router.route("/").post(protect, snedMessage );
// router.route("/:chatId").get(protect, allMessages );

module.exports = router;
