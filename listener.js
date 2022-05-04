// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
const { parse } = require("path");


const Mux = require('@mux/mux-node');
const dotenv = require('dotenv');
dotenv.config();

const app = express()
const server = http.createServer(app);
app.use(bodyParser.json())
server.listen(5005, () => console.log(`Server running on port 5005`))

const io = new Server(server);

const muxClient = new Mux.default();
const { Video } = muxClient;

// route to accept the webhook
app.post("/", (req, res) => {
  console.log(req.body)
  io.sockets.emit("webhook", req.body);
  res.status(200).end() // Responding is important
})

app.get("/url", async (req, res) => {
  const upload = await Video.Uploads.create({
      cors_origin: '*',
      new_asset_settings: {
        playback_policy: 'public',
      },
  });
  res.end(upload.url); 
})

app.post("/create", async (req, res) => {
  const asset = await Video.Assets.create({
    input: req.body.url,
    "playback_policy": [
      "public" 
    ],
  });
  console.log("asset created: " + req.body.url)
})

// load the client side html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



