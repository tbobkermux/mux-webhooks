# Simple example of how to use Mux Webhooks
Uses [socket.io](https://socket.io/) for websocket communication between the server and client to automatically update the client side when a webhook is recieved and [Upchunk](https://github.com/muxinc/upchunk) for direct uploads. 

This also uses [localtunnel](https://github.com/localtunnel/localtunnel) to enable a fixed url to use for the webhook url.  

## Requirements 
Run ```yarn install``` or ```npm install```
This installs npm packages required to run the examples.

rename the ```.env_example``` file to ```.env``` and populate the environment variables with your API key and secret and chosen subdomain that will be used for the fixed webhook url.

## Run the example
Now run ```yarn start``` in the terminal to start localtunnel and node server.

Use the generated public localtunnel url and use it to populate Mux dashboard > settings > Webhooks > Create New webhook. 