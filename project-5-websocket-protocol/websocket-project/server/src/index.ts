// import WebSockets, { WebSocketServer } from "ws";
// import http from "http";

// const server = http.createServer((req, res) => {
//   res.end("I am connected");
// });

// const wss = new WebSocketServer({ server });

// let userCount = 0;
// wss.on("connection", (ws) => {
//   console.log("New client connected");
//   ws.on("error", (err) => {
//     console.log(`Error: ${err}`);
//   });
//   ws.on("message", (message) => {
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSockets.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });
//   console.log(`User connected: ${++userCount}`);
//   ws.send("Welcome to the chat");
// });

// server.listen(8080, () => {
//   console.log("Server started on http://localhost:8080");
// });

import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server: httpServer });


wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.on("error", (err) => {
        console.log(`Error: ${err}`);
    });
    ws.on("message", (message) => {
        wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
        });
    });
    ws.send("Welcome to the chat");
    }
);


