const socket = new WebSocket("ws://localhost:3000");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.send(input.value);
    input.value = "";
  }
  input.focus();
}

document.querySelector("button").addEventListener("click", sendMessage);

socket.addEventListener("message", ({ data }) => {
  const list = document.createElement("li");
  list.innerHTML = data;
  document.querySelector("ul").appendChild(list);
});
