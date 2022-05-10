#!/bin/bash

#################################
# Check for dependent packages
#################################

#check for python
if ! command -v python3 > /dev/null 2>&1; then brew install python@3.10; fi

if ~ command -v pip --version > /dev/null 2>&1; then brew install pip; fi

# check for Flask or requests
#pip list | grep -E '(Flask|requests)' > /dev/null && if [ $? != 0 ]; then pip install -r requirements.txt; fi

# check for tmux
if ! command -v tmux > /dev/null 2>&1; then brew install mux; fi

# check for ngrok
if ! command -v ngrok > /dev/null 2>&1; then brew install ngrok/ngrok/ngrok && printf "\n\nYou will need to enter your ngrok auth token.\n\n ngrok config add-auth {token} \n\n https://ngrok.com/download \n\n"; exit 1; fi

#################################
# Open tmux and

function startTMUXSession() {
    #start a fresh session
    tmux kill-session -t webhooks

    

    session='webhooks'
    window=0

    tmux new-session -d -s $session 
    tmux split-window -v
    tmux select-pane -t 0
    tmux send-keys -t $session:$window "ngrok http 5005" C-m
    tmux select-pane -t 1
    sleep 1 # Gives the ngrok enough time to start before opening the GUI 
    tmux send-keys -t $session:$window "node listener.js" C-m 
    tmux attach -t $session
}

startTMUXSession

