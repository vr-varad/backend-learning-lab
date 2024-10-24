const socket = io("ws://localhost:3000");
const input = document.querySelector("input");
const activity = document.querySelector(".activity");

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    socket.send(input.value);
  }
  input.value = "";
}

document.querySelector("button").addEventListener("click", sendMessage);

socket.on("message", (data) => {
  activity.textContent = ""
  const list = document.createElement("li");
  list.innerHTML = data;
  document.querySelector("ul").appendChild(list);
});

input.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substr(0, 5));
});

let activityTimer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing`;
  clearTimeout(activityTimer)
  activityTimer = setTimeout(()=>{
    activity.textContent = ""
  },3000)
});
