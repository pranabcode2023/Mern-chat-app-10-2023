const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectMongoDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();

connectMongoDB();
app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

//NOTE - test purpose
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id);
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started on port ${PORT}`.bgBlue.bold));
