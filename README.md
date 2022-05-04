# Simple example of how to use Mux Webhook
Uses [socket.io](https://socket.io/) for websocket communication between the server and client to automatically update the client side when a webhook is recieved and [Upchunk](https://github.com/muxinc/upchunk) for direct uploads. 

## Requirements 
Run ```yarn install``` or ```npm install```
This installs packages socket.io to client/server communication using sockets and express to setup a route.
Install and run ngrok locally to get a public facing webhook url

## Run the example
rename the ```.env_example``` file to ```.env``` and populate the environment variables with your API key and secret.

Now run node and ngrok by typing these commands in the terminal ```node listener.js``` then start ngrok with ```ngrok http 5005```

Use the generated public ngrok url and use it as the url to notify in Mux dashboard > settings > Webhooks > Create New webhook. 

Make sure to select the same environment as the API key/secret. 