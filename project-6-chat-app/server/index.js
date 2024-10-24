import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id}: Message Recieved at ${new Date()}`);
  });
});

httpServer.listen(3000);
