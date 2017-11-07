# FSWD Project 6 - Linux Server Configuration

## Goal of the Project
Take a baseline installation of a Linux server and prepare it to host web applications. Secure the server from a number of attack vectors, install and configure a database server, and deploy an existing web application onto it.

## Server Details
Linux-based [Amazon Lightsail](https://amazonlightsail.com/) instance (virtual private server), location is London, Zone A.  
Linux instance is Ubuntu 16.04 LTS.  

Hostname: `amazon-lightsail-jsoetens01`  
IP Address: `35.177.58.142`   
SSH Port: `2200`  
URL Web App: `http://ec2-35-177-58-142.eu-west-2.compute.amazonaws.com`

## Server Configuration
### User Management
* Remote login of the root user has been disabled.
* User grader can run sudo. SSH keys have been configured.
* User nagforst can run sudo and is used to administer the Web App.

### Security
* All currently installed system packages have been updated.
* Key-based SSH authentication is enforced.
* SSH port has been changed to 2200.
* Ubuntu Uncomplicated Firewall (UFW) is configured to only allow incoming connections for HTTP (TCP/80), NTP (UDP/123) and SSH (TCP/2200). The Amazon Lightsail firewall has been configured accordingly.

### PostgreSQL
* Remote connections have been disabled.
* Database nagforst has been created, access is limited to user nagforst and public access has been revoked.

### Installed software
* [Python 3.6.3](https://www.python.org/downloads/release/python-363/)
* [Pipenv 8.3.2](https://docs.pipenv.org) as Python packaging tool.
* [Apache 2.4.18](https://httpd.apache.org/)
* [mod_wsgi 4.5.20](https://modwsgi.readthedocs.io/en/develop/) has been installed from source and configured using the latest Python version.
* [PostgreSQL 10](https://www.postgresql.org) has been installed from the PostgreSQL [APT Repository](https://wiki.postgresql.org/wiki/Apt).

## Application Functionality
An [Apache HTTP Server](https://httpd.apache.org/docs/2.4/vhosts/) has been set up using a virtual host that listens on port 80. The application source files are owned by nagforst and group www-data.  
The [WSGIDaemonProcess](http://modwsgi.readthedocs.io/en/develop/configuration-directives/WSGIDaemonProcess.html) runs with user nagforst and uses a Python virtual environment using Pipenv - this requires an environmental variable WORKON_HOME for nagforst, more details at [Advanced Usage of Pipenv](https://docs.pipenv.org/advanced.html).

## Getting Started
### Connecting with SSH
`ssh -i ~/.ssh/amazon-lightsail-jsoetens01.pem grader@35.177.58.142 -p 2200`  

### Access the Web Application
Open [this url](http://ec2-35-177-58-142.eu-west-2.compute.amazonaws.com) in your favorite browser.

## Where can I learn more?
Follow the awesome [Udacity Full Stack Web Developer Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004)!
