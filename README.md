# delegates supervisor

Forked from [cdk-admin](https://github.com/codetok/cdk-admin), an Angular 6 admin panel using angular material & angular flex.




## Introduction

This website is optional and only for solo delegates

This website will give users
* A dashboard to view there statistics and total blocks

**Note this can be setup on a separate system than the XCASH_DPOPS system, since it uses API calls to the delegates website**



## Table of Contents  
[Dependencies](#dependencies)  
[Installation Process](#installation-process)  
[Configure the Container](#configure-the-container)  
[Update Process](#update-process)

[Testing](#testing) 
 
 
## Dependencies

The following table summarizes the tools and libraries required to run XCASH DPOPS - Delegate Website

| Dependencies                                 | Min. version  | Ubuntu package            |
| -------------------------------------------- | ------------- | ------------------------- |
| Node.js                                      | 8             |  install from script    | 
| Angular                                      | 6             |  install from script         |
| Nginx                                  | latest version | install from script |



## Installation Process

You can install and update the website in a LXD/LXC container using the autoinstaller.
 
We will use LXD to manage LXC containers as this is a more user friendly tool for LXC containers. LXD might already be installed on some Ubuntu servers, but it is recommend to uninstall this version of LXD and install LXD using a snap. This is because the LXD that comes installed on some servers will not be up to date and can only be updated to minor releases.

First check if LXD is already installed on your server  
`lxd --version`

If it does output a version, then uninstall it  
`sudo apt remove -y --purge lxd lxd-client`

Then install LXD  
`sudo snap install lxd`

Then run the configuration for LXD and press enter to get the default selection to the configuration questions  
`lxd init`

When it ask for the size of the new loop device, dont use the default answer, instead specify 80-90% of your disk space, this way your containers wont have an artifical low disk space limit and can use most of your disk space.

Then run the following on the host, to let the autoinstaller install the website into a LXC/LXD container, and choose install mode

```
bash -c "$(curl -sSL https://raw.githubusercontent.com/X-CASH-official/delegates-supervisor/master/scripts/autoinstaller.sh)"
```

The container should be started but here are the basic commands for maintaining the container

To start the container  
`lxc start container`

To stop the container  
`lxc stop container`

To delete the container (Note the container must be stopped first)  
`lxc delete container`

To open a terminal inside the container  
`lxc exec container -- bash`

To exit the terminal  
`exit`

To list all running containers  
`lxc list`



## Configure the Container

Now you need to setup port forwarding on the container to route all traffic on port 80 to the container.

First get the containers private IP address (the IPV4 address)  
`lxc list`

Then forward the ports to the containers private IP address  
```
lxc config device add delegates-supervisor delegates-supervisor-80 proxy listen=tcp:PUBLIC_IP_OF_SERVER:80 connect=tcp:PRIVATE_IP_OF_CONTAINER:80
```

to remove the proxy  
`lxc config device remove delegates-supervisor delegates-supervisor-80`



## Update Process

Run the autoinstaller on the host, and choose the update mode



## Testing

Run the angular test to make sure the website is functioning correctly  
`npm test`