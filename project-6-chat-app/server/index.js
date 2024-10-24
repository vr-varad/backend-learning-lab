import { Server } from "socket.io";
import express from "express";

const app = express();

const expressServer = app.listen(3000, () => {
  console.log("Server Running At port 3000");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("message", "Welcome To the chat App");
  socket.broadcast.emit(
    "message",
    `User with userId ${socket.id.substring(0, 5)} connected`
  );
  socket.on("message", (data) => {
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `User with userId ${socket.id.substring(0, 5)} disconnected`
    );
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});
