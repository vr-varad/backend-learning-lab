const express = require("express");
const app = express();
const taskRouter = require('./routes/tasks.router')

const port = 3000;

// middleware
app.use(express.json())


// routes
app.get("/hello", (req, res) => {
  res.send("hi from server");
});

app.use('/api/v1/tasks', taskRouter)

app.listen(port, () => {
  console.log("Server Starting At Port", port);
});
