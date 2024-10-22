import { createServer } from "http";
import crypto from "crypto";

const WEB_SOCKET_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const SEVEN_BITS_INTEGER_MARKER = 125;
const SIXTEEN_BITS_INTEGER_MARKER = 126;
const SIXTYFOUR_BITS_INTEGER_MARKER = 127;

const MAX_SIXTEENBITS_INTEGER = 2 ** 16;

const MASK_KEY_BYTES_LENGTH = 4;

const FIRST_BIT = 128;
const OPCODE_BIT = 0x01;

const server = createServer((request, response) => {
  response.writeHead(200);
  response.end("hey this is from the server");
}).listen(3000, () => {
  console.log(`server started at port 3000`);
});

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(req, socket, head) {
  const { "sec-websocket-key": webClientSocketKey } = req.headers;
  const headers = prepareHandleShakeError(webClientSocketKey);
  socket.write(headers);
  socket.on("readable", () => prepareMessage(socket));
}

function prepareMessage(socket) {
  socket.read(1);
  const [markerAndPayloadLength] = socket.read(1);
  const lenghtofPayload = markerAndPayloadLength - FIRST_BIT;
  let messageLength = 0;
  if (lenghtofPayload <= SEVEN_BITS_INTEGER_MARKER) {
    messageLength = lenghtofPayload;
  } else if (lenghtofPayload == SIXTEEN_BITS_INTEGER_MARKER) {
    messageLength = socket.read(2).readUint16BE(0);
  } else {
    throw new Error("Message too long");
  }

  const maskKey = socket.read(MASK_KEY_BYTES_LENGTH);
  const encoded = socket.read(messageLength);
  const decoded = Uint8Array.from(encoded, (elt, i) => elt ^ maskKey[i % 4]);
  const received = new TextDecoder().decode(decoded);
  const data = JSON.parse(received);
  console.log("message received!", data);
  const message = JSON.stringify({
    success: true,
    message: "Data recieved",
    receivedData: data,
    date: new Date(),
  });
  sendMessage(message, socket);
}

function sendMessage(msg, socket) {
  const data = prepareSendMessage(msg);
  socket.write(data);
}

function prepareSendMessage(message) {
  const msg = Buffer.from(message);
  const messageLength = msg.length;

  let dataFrameBuffer;

  const firstByte = 0x80 | OPCODE_BIT;
  if (messageLength <= SEVEN_BITS_INTEGER_MARKER) {
    const bytes = [firstByte];
    dataFrameBuffer = Buffer.from(bytes.concat(messageLength));
  } else if (messageLength <= MAX_SIXTEENBITS_INTEGER) {
    const offset = 4;
    const target = Buffer.allocUnsafe(offset);
    target[0] = firstByte;
    target[1] = SIXTEEN_BITS_INTEGER_MARKER | 0x0;

    target.writeInt16BE(messageLength, 2);
    dataFrameBuffer = target;
  } else {
    throw new Error("Message Too Long . . .");
  }

  const totalLength = dataFrameBuffer.byteLength + messageLength;
  const dataFrameResponse = concat([dataFrameBuffer, msg], totalLength);
  return dataFrameResponse;
}

function concat(bufferList, bufferLength) {
  const target = Buffer.allocUnsafe(bufferLength);
  let offset = 0;
  for (const buffer of bufferList) {
    target.set(buffer, offset);
    offset += buffer.length;
  }
  return target;
}

function prepareHandleShakeError(webClientSocketKey) {
  const acceptKey = createAcceptKey(webClientSocketKey);
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
    "",
  ]
    .map((line) => line.concat("\r\n"))
    .join("");
  return headers;
}
function createAcceptKey(id) {
  const sha = crypto.createHash("sha1");
  sha.update(id + WEB_SOCKET_STRING);
  return sha.digest("base64");
}

["uncaughtException", "uncaughtException"].forEach((event) => {
  process.on(event, (err) => {
    console.log(
      `something went wrong! event : ${event}, msg : ${err.message || err}`
    );
  });
});
