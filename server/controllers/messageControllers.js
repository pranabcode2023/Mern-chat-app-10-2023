const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");

const sendMessage = expressAsyncHandler(async (req, res) => {});

module.exports = { sendMessage };
