"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new ws_1.WebSocketServer({ server });
let userCount = 0;
wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.on("error", (err) => {
        console.log(`Error: ${err}`);
    });
    ws.on("message", (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                const utfdecoder = new TextDecoder('utf-8');
                console.log(utfdecoder.decode(Buffer.from(message)));
                client.send(message);
            }
        });
    });
    console.log(`User connected: ${++userCount}`);
    ws.send("Welcome to the chat");
});
server.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});
