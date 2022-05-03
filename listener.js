// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
const { parse } = require("path");


const app = express()
const server = http.createServer(app);
app.use(bodyParser.json())
server.listen(5005, () => console.log(`Server running on port ${PORT}`))

const io = new Server(server);

// route to accept the webhook
app.post("/", (req, res) => {
  console.log(req.body)
  io.sockets.emit("webhook", req.body.type);
  res.status(200).end() // Responding is important
})

// load the client side html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



