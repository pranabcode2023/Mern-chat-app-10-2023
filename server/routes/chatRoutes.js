const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessSingleChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");
const router = express.Router();
// chat route
router.post("/accessSingleChat", protect, accessSingleChat);
router.get("/fetchChats", protect, fetchChats);
router.post("/createGroupChat", protect, createGroupChat);
router.put("/renameGroup", protect, renameGroup);
router.put("/removeFromGroup", protect, removeFromGroup);
router.put("/addToGroup", protect, addToGroup);

//NOTE - another method
// router.route("/").post(protect, accessSingleChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
