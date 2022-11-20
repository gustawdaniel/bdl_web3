#!/bin/bash

export DOCKER_REGISTRY_DOMAIN={{:DOCKER_REGISTRY_DOMAIN}}
export DOCKER_TOKEN={{:DOCKER_TOKEN}}

cat <<EOT >> ~/.bashrc
export DOCKER_REGISTRY_DOMAIN={{:DOCKER_REGISTRY_DOMAIN}}
export DOCKER_TOKEN={{:DOCKER_TOKEN}}
EOT

cat <<EOT >> ~/.tmux.conf
set -g terminal-overrides 'xterm*:smcup@:rmcup@'

# remap prefix from 'C-b' to 'C-a'
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# switch panes using Alt-arrow without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Enable mouse control (clickable windows, panes, resizable panes)
#set -g mouse-select-window on
#set -g mouse-select-pane on
#set -g mouse-resize-pane on

# Enable mouse mode (tmux 2.1 and above)
set -g mouse on

set -g pane-border-format "#{pane_index}#{?@custom_pane_title,:#{@custom_pane_title},}:#{pane_title}"

bind e set-window-option synchronize-panes
EOT

sudo systemctl disable snapd.service
sudo systemctl disable snapd.socket
sudo systemctl disable snapd.seeded.service

sudo apt autoremove --purge snapd -y
sudo rm -rf /var/cache/snapd/
rm -rf ~/snap

echo "${DOCKER_TOKEN}" | docker login -u "${DOCKER_TOKEN}" "${DOCKER_REGISTRY_DOMAIN}" --password-stdin;

apt -y update
apt -y install python3 python3-pip
pip3 install docker docker-compose

git clone --recurse-submodules https://github.com/evertramos/nginx-proxy-automation.git ~/proxy && cd ~/proxy/bin && ./fresh-start.sh --yes -e gustaw.daniel@gmail.com --use-nginx-conf-files
