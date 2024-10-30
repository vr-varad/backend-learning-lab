const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");
app.use(cors());

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

app.use(express.json());
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("join-room", (data) => {
    const { email, roomId } = data;
    console.log("User joined room", email, roomId);
    socket.join(roomId);
    emailToSocketId.set(email, socket.id);
    socketIdToEmail.set(socket.id, email);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", email);
  });

  socket.on("call-user", (data) => {
    const { email, offer } = data;
    const emailFrom = socketIdToEmail.get(socket.id);
    const socketId = emailToSocketId.get(email);
    if (!socketId) {
      console.error(`No socket ID found for email: ${email}`);
      return;
    }
    socket.to(socketId).emit("incoming-call", { from: emailFrom, offer });
  });

  socket.on("call-accepted", (data) => {
    const { email, answer } = data;
    const emailFrom = socketIdToEmail.get(socket.id);
    const socketId = emailToSocketId.get(email);
    socket.to(socketId).emit("call-accepted", { from: emailFrom, answer });
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
