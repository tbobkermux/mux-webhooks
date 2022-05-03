// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
const { parse } = require("path");
// Initialize express and define a port
const app = express()
const server = http.createServer(app);
const PORT = 5005
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

const io = new Server(server);
// Start express on the defined port

app.post("/", (req, res) => {
  console.log(req.body)
  io.sockets.emit("webhook", req.body.type);
  res.status(200).end() // Responding is important
})


