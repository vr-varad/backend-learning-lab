import { createServer } from "http";
import crypto from 'crypto'

const WEB_SOCKET_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const server = createServer((request, response) => {
  response.writeHead(200);
  response.end("hey this is from the server");
}).listen(3000, () => {
  console.log(`server started at port 3000`);
});

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(req, socket, head){
    const { "sec-websocket-key": webClientSocketKey } = req.headers;
    const headers = prepareHandleShakeError(webClientSocketKey)
    socket.write(headers)
  }
function prepareHandleShakeError(webClientSocketKey){
    const acceptKey = createAcceptKey(webClientSocketKey)
    const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    ''
    ].map(line => line.concat('\r\n')).join('')
    return headers
}
function createAcceptKey(id){
    const sha = crypto.createHash('sha1')
    sha.update(id+WEB_SOCKET_STRING)
    return sha.digest('base64')
}

["uncaughtException", "uncaughtException"].forEach((event) => {
  process.on(event, (err) => {
    console.log(
      `something went wrong! event : ${event}, msg : ${err.message || err}`
    );
  });
});
