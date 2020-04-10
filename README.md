<div align=middle>

<a align="center" href="https://x-network.io/xcash"><img src="header.png" alt="X-Cash Core"></a>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/discord/470575102203920395?logo=discord)](https://discordapp.com/invite/4CAahnd)

</div>

# X-Cash Delegates Supervisor

👨‍💻 **Easy access to your statistics and information on the latest block creation**

*Admin-panel-styled dashboard forked from [cdk-admin](https://github.com/codetok/cdk-admin), an Angular 6 admin panel using angular material.*

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Security](#security)
- [Installation Process](#installation-process)
  - [Dependencies](#dependencies)
  - [Requirements](#requirements)
  - [Update Process](#update-process)
  - [Testing](#testing)

## Features

> This website is *optional* to run for solo delegates. It can be setup on a separate system than the `xcash-dpops` node as it's using API calls to the explorer.

**One-stop Dashboard**  
Have a quick view of the latest block creation and your delegate statistics.

## License

**The X-Cash Delegate Explorer is an open-source project managed by the X-Cash Foundation**.  
We are operating under the [MIT License](LICENSE).

## Contributing

**Thank you for thinking of contributing! 😃**   
If you want to help out, check [CONTRIBUTING](https://github.com/X-CASH-official/.github/blob/master/CONTRIBUTING.md) for a set of guidelines and check our [opened issues](https://github.com/X-CASH-official/delegates-explorer/issues).

## Documentation

We are hosting our documentation on **GitBook** 👉 [**docs.xcash.foundation**](https://docs.xcash.foundation/)

> You can contribute directly on our [`gitbook-docs`](https://github.com/X-CASH-official/gitbook-docs) repository.

## Security 

If you discover a **security** vulnerability, please send an e-mail to [security@xcash.foundation](mailto:security@xcash.foundation).  
All security vulnerabilities concerning the X-Cash blockchain will be promply addressed.
 
## Installation Process

### Dependencies

> The following table summarizes the tools and libraries required to run the delegates explorer.

| Dependencies | Min. version   | Ubuntu package                                                      |
| ------------ | -------------- | ------------------------------------------------------------------- |
| `Node.js`      | 8              | install from binaries                                               |
| `Angular`      | 6              | install from `npm`                                                    |
| `nginx`                                  | latest version | install from script |

### Requirements

#### Update LXD

> LXD is a Linux Container system manager. Learn more [here](https://linuxcontainers.org/) 

*You can install and update the website in a LXD/LXC container using the [`xcash-dpops`](https://github.com/X-CASH-official/xcash-dpops/tree/master#system-requirements) auto-installer.*

Check if LXD is installed:
```bash
lxd --version
```

If it displays a version, it is recommneded to uninstall it to update it manually. Run:
```bash
sudo apt remove -y --purge lxd lxd-client
```

Then reinstall the latest version:
```bash
sudo snap install lxd
```

Run the configuration for LXD and set the default selection to the configuration questions:

```bash
lxd init
```

> For the size of the new loop device **specify 80-90% of your disk space**. Your containers won't have an artifical low disk space limit.

#### Install from script

Run the `autoinstaller.sh` to install the website into a LXC/LXD container:

```bash
bash -c "$(curl -sSL https://raw.githubusercontent.com/X-CASH-official/delegates-supervisor/master/scripts/autoinstaller.sh)"
```

The website will be started in the LXC container.

<details><summary><strong>Container commands</strong></summary>

```bash
# Start the container  
lxc start container

# Stop the container  
lxc stop container

# Delete the container (The container must be stopped first)  
lxc delete container

# Open a terminal inside the container  
lxc exec container -- bash

# Exit the terminal  
exit

# List all running containers  
lxc list
```

</details>

#### Configure the container

You need to setup port forwarding on the container to route all traffic on `port 80` to the container.

Check the containers private IPV4 address:
```bash
lxc list
```

Then forward the ports to the containers private IP address:  
```bash
lxc config device add delegates-supervisor delegates-supervisor-80 proxy listen=tcp:PUBLIC_IP_OF_SERVER:80 connect=tcp:PRIVATE_IP_OF_CONTAINER:80
```

#### Remove proxy

```bash
lxc config device remove delegates-supervisor delegates-supervisor-80
```


### Update Process

Run the `autoinstaller.sh` on the host and choose the update mode:

```bash
bash -c "$(curl -sSL https://raw.githubusercontent.com/X-CASH-official/delegates-supervisor/master/scripts/autoinstaller.sh)"
``` 

### Testing

```bash
npm test
```