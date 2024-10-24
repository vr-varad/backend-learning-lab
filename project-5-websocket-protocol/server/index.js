const ws = require("ws");
const server = new ws.Server({
  port: "3000",
});

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const recievedMessage = Buffer.from(message);
    console.log(recievedMessage.toString());
    socket.send(`Recieved Message : ${message}`);
  });
});
