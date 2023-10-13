const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();
//NOTE - in this way you can put multiple endpoint
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
