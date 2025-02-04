require("dotenv").config();
const connectDb = require("./db/connectDb");
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const Messages = require("./models/messages.model");
const ChatRoom = require("./models/chatRoom");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/request.routes");
const friendRoutes = require("./routes/friend.routes");
const suggestionRoutes = require("./routes/suggestion.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const messageRoutes = require("./routes/message.routes")

app.use("/public", express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/suggestion", suggestionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  allowedHeaders: ["Content-Type"], // Optionally, if you're sending specific headers
  credentials: true,
});
const port = process.env.port || 4001;

io.on("connection", (socket) => {
  console.log("A new user connected ", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected ", socket.id);
  });

  socket.on("join-room", async ({ user1, user2 }) => {
    let chatRoom = await ChatRoom.findOne({
      $or: [
        { participant1: user1, participant2: user2 },
        { participant1: user2, participant2: user1 },
      ],
    });

    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        participant1: user1,
        participant2: user2,
      });
    }
    console.log(`${user1} joinded ${chatRoom._id.toString()}`)
    socket.join(chatRoom._id.toString());
    io.emit("joined-room", {roomId: chatRoom._id.toString()})
  });

  socket.on("sent-message", ({roomId, message, senderId, recipientId}) => {

    const createMessage = async () => {
      const newMessage = await Messages.create({
        chatRoom: roomId,
        message,
        senderId,
        recipientId
      });
      return newMessage
    };
    createMessage()
    .then((message) => {
      io.to(roomId).emit("received-message", {message: message.message, senderId: message.senderId})
    })
  })

  socket.on("leave-room", ({ roomId }) => {
    console.log("someone leaved the room", roomId)
    socket.leave(roomId);
  });

});

connectDb().then(() => {
  server.listen(port, () => {
    console.log("App listening at port " + port);
  });
});