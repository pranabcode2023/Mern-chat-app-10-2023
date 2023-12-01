const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectMongoDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
// const path = require("path");
const cors = require("cors");

//configure dotenv
dotenv.config();

//NOTE - call function to connect MongoDB
connectMongoDB();

//rest object
const app = express();

//middelwares
app.use(cors());
//NOTE - to accept json data
app.use(express.json());

//NOTE - comented out for render deployment
// app.get("/", (req, res) => {
//   res.send("API is Running Successfully");
// });

//NOTE - userRoutes, chatroutes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------for render deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "../client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "../client/build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is Running Successfully");
//   });
// }

// --------------------------vercel deployment------------------------------

//REVIEW[epic=deploy, seq=2] once the client is deployed we can add the URL to the list of allowed Origins

//REVIEW[epic=deploy, seq=3] the first origin should be the localhost port our client runs on. The second one, vercel's URL for our client
// console.log('LOCALHOST_CLIENT', process.env.LOCALHOST_CLIENT)

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-mern-stack-app-vercel-client.vercel.app",

  //NOTE - url put into env file
  // process.env.LOCALHOST_CLIENT,
  // process.env.VERCEL_CLIENT,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
//*********************vercel deployment *********************************/

//NOTE - error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bgBlue.bold);
});

//NOTE - Socket io
const io = require("socket.io")(server, {
  pingTimeout: 70000,
  cors: {
    // origin: ["https://chat-app-rfe4.onrender.com"],
    // origin: ["http://localhost:3000"],
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  //NOTE - to save bandwith
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
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
