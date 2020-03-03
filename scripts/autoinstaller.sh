#!/bin/bash

# Set the script to exit if any command fails
set -e

# Color print variables
COLOR_PRINT_RED="\033[1;31m"
COLOR_PRINT_GREEN="\033[1;32m"
COLOR_PRINT_YELLOW="\033[1;33m"
END_COLOR_PRINT="\033[0m"

# Configuration settings
INSTALLATION_TYPE_SETTINGS=""
CONTAINER_NAME=XCASH-DPOPS-solo-delegate-website
NGINX_CONFIGURATION_SETTINGS_FILE=/etc/nginx/sites-available/default
WEBSITE_DIRECTORY=/var/www/html
SOLO_DELEGATES_WEBSITE_URL=https://github.com/X-CASH-official/delegates-supervisor.git
SOLO_DELEGATES_WEBSITE_DIR=/root/delegates-supervisor
PUBLIC_ADDRESS=""

# Files
NGINX_CONFIGURATION="$(cat << EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
 
    root /var/www/html;
    index index.html;
 
    server_name _;
 
    location / {
        try_files $uri $uri/ /index.html =404;
    }
}
EOF
)"

SOLO_DELEGATE_PUBLIC_ADDRESS_FILE=""



# Functions

function get_installation_settings()
{
  echo -ne "${COLOR_PRINT_YELLOW}Installation Type (Install)\n1 = Install\n2 = Update\nEnter the number of the installation type: ${END_COLOR_PRINT}"
  read -r data
  INSTALLATION_TYPE_SETTINGS=$([ "$data" == "2" ] && echo "$data" || echo "1")
  echo -ne "\r"
  echo
}

function get_public_address()
{
  echo -ne "${COLOR_PRINT_YELLOW}Public Address: ${END_COLOR_PRINT}"
  read -r PUBLIC_ADDRESS    
  echo -ne "\r"
  echo
}

function update_files()
{
SOLO_DELEGATE_PUBLIC_ADDRESS_FILE="$(cat << EOF
import {Injectable} from '@angular/core';

@Injectable()
export class public_address{
constructor() {}

PUBLIC_ADDRESS:string = "${PUBLIC_ADDRESS}";
}
EOF
)"
}

function create_container()
{
  echo -ne "${COLOR_PRINT_YELLOW}Creating Container${END_COLOR_PRINT}"
  lxc launch --profile default ubuntu:18.04 ${CONTAINER_NAME} &>/dev/null
  sleep 60s
  echo -ne "\r${COLOR_PRINT_GREEN}Creating Container${END_COLOR_PRINT}"
  echo
}

function update_packages_list()
{
  echo -ne "${COLOR_PRINT_YELLOW}Updating Packages List${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- apt update -y &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Updating Packages List${END_COLOR_PRINT}"
  echo
}

function install_nginx()
{
  echo -ne "${COLOR_PRINT_YELLOW}Installing Nginx${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- apt install -y nginx &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Installing Nginx${END_COLOR_PRINT}"
  echo
}

function install_nodejs()
{
  echo -ne "${COLOR_PRINT_YELLOW}Installing Nodejs${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- bash -c "curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash - && sudo apt install -y nodejs" &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Installing Nodejs${END_COLOR_PRINT}"
  echo
}
 
function update_npm()
{
  echo -ne "${COLOR_PRINT_YELLOW}Updating NPM${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- npm install -g npm &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Updating NPM${END_COLOR_PRINT}"
  echo
}

function configure_npm()
{
  echo -ne "${COLOR_PRINT_YELLOW}Configuring NPM${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- npm config set user 0 &>/dev/null
  lxc exec ${CONTAINER_NAME} -- npm config set unsafe-perm true &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Configuring NPM${END_COLOR_PRINT}"
}

function install_npm_global_packages()
{
  echo -ne "${COLOR_PRINT_YELLOW}Installing Global NPM Packages${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- npm install -g @angular/cli@latest uglify-js &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Installing Global NPM Packages${END_COLOR_PRINT}"
  echo
}

function configuring_nginx()
{
  echo -ne "${COLOR_PRINT_YELLOW}Configuring Nginx${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- bash -c "echo '' > '${NGINX_CONFIGURATION_SETTINGS_FILE}' && echo '${NGINX_CONFIGURATION}' > '${NGINX_CONFIGURATION_SETTINGS_FILE}'" &>/dev/null
  lxc exec ${CONTAINER_NAME} -- bash -c "sudo systemctl restart nginx" &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Configuring Nginx${END_COLOR_PRINT}"
  echo
}

function download_solo_delegate_website()
{
  echo -ne "${COLOR_PRINT_YELLOW}Downloading Solo Delegates Website${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- apt install git -y &>/dev/null
  lxc exec ${CONTAINER_NAME} -- git clone --quiet ${SOLO_DELEGATES_WEBSITE_URL} &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Downloading Solo Delegates Website${END_COLOR_PRINT}"
  echo
}

function update_solo_delegate_website()
{
  echo -ne "${COLOR_PRINT_YELLOW}Updating Solo Delegates Website${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- bash -c "cd '${SOLO_DELEGATES_WEBSITE_DIR}' && git stash && git pull && git stash pop" &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Updating Solo Delegates Website${END_COLOR_PRINT}"
  echo
}

function install_solo_delegates_website_npm_packages()
{
  echo -ne "${COLOR_PRINT_YELLOW}Updating node_modules${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- bash -c "cd '${SOLO_DELEGATES_WEBSITE_DIR}' && rm src/app/services/public_address.service.ts && echo '${SOLO_DELEGATE_PUBLIC_ADDRESS_FILE}' > src/app/services/public_address.service.ts && npm update" &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Updating node_modules${END_COLOR_PRINT}"
  echo
}

function build_solo_delegates_website()
{
  echo -ne "${COLOR_PRINT_YELLOW}Building solo delegates website${END_COLOR_PRINT}"
  lxc exec ${CONTAINER_NAME} -- bash -c "cd '${SOLO_DELEGATES_WEBSITE_DIR}' && npm run build && cd dist && for f in *.js; do uglifyjs \"$f\" --compress --mangle --output \"{$f}min\"; rm \"$f\"; mv \"{$f}min\" \"$f\"; done && cd ../ && cp -a dist '${WEBSITE_DIRECTORY}'" &>/dev/null
  echo -ne "\r${COLOR_PRINT_GREEN}Building solo delegates website${END_COLOR_PRINT}"
  echo
}

function install()
{
  echo
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}                  Starting Installation${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"

  update_solo_delegates_website
  install_solo_delegates_website_npm_packages
  build_solo_delegates_website

  echo
  echo
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}          Installation Has Completed Successfully  ${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo
  echo
  echo -e "${COLOR_PRINT_YELLOW}You can access a terminal inside the container using lxc exec container -- bash${END_COLOR_PRINT}"
}

function update()
{
  echo
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}                  Starting Update${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"

 
  update_solo_delegate_website
  build_solo_delegates_website

  echo
  echo
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}          Update Has Completed Successfully  ${END_COLOR_PRINT}"
  echo -e "${COLOR_PRINT_GREEN}############################################################${END_COLOR_PRINT}"
  echo
  echo
  echo -e "${COLOR_PRINT_YELLOW}You can access a terminal inside the container using lxc exec container -- bash${END_COLOR_PRINT}"
}

# Get the installation settings
installation_settings

if [ "$INSTALLATION_TYPE_SETTINGS" -eq "1" ]; then
  install
elif [ "$INSTALLATION_TYPE_SETTINGS" -eq "2" ]; then
  update
fi