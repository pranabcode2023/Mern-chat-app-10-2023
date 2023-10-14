const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectMongoDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
//NOTE - call function to connect MongoDB
connectMongoDB();
const app = express();
//NOTE - to accept json data
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

//NOTE - userRoutes, chatroutes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//NOTE - error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started on port ${PORT}`.bgBlue.bold));

//NOTE - test purpose
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id);
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });
