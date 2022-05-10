#!/bin/bash

#################################
# Check for dependent packages
#################################

# check for tmux
if ! command -v tmux > /dev/null 2>&1; then brew install mux; fi

#################################
# Open tmux and

function startTMUXSession() {

    source .env
    
    #start a fresh session
    tmux kill-session -t webhooks

    session='webhooks'
    window=0

    tmux new-session -d -s $session 
    tmux split-window -v
    tmux select-pane -t 0
    tmux send-keys -t $session:$window "npx localtunnel --port 5005 --subdomain ${SUBDOMAIN}" C-m
    tmux select-pane -t 1
    sleep 1 # Gives the ngrok enough time to start before opening the GUI 
    tmux send-keys -t $session:$window "node listener.js" C-m 
    tmux attach -t $session
}

startTMUXSession

