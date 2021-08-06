---
title: "How to Automate Manual Steps after SSH"
date: 2019-03-31T10:44:30-04:00
categories:
  - linux
classes: wide
excerpt: Learn how to automate repetitive commands after connecting to a SSH server
---

I recently worked on a Django web application which was deployed on a Linux Server with SSH access. Deployments
were done manually and the CI/CD pipeline was still in planning.

We had to perform these tasks every time to deploy the latest changes.

- SSH into the server
- Goto directory where the code is present
- Activate Virtual Environment
- Pull the latest changes on the current branch using Git
- Install any newly added libraries from requirements.txt
- Run migrations for the database
- Run command to generate static files
- Restart Nginx and Supervisor

I found the process repetitive and researched on whether it was possible to automate the commands I need to run
after SSHing into the server.

```shell
ssh -i "webapp.pem" ubuntu@example.com
```

Turns out, we can write a shell script to automate the task.

## Step 1:

Create a new shell script file `deploy.sh` with the following content. Modify it to point to your PEM file, username, and IP address.

```shell
#!/bin/bash
ssh -i "webapp.pem" ubuntu@example.com << EOF
    echo "Hello World"
EOF
```

The above code prints 'Hello World' on the remote server.

## Step 2:

You can write any shell commands between the two `EOF` and it will be run on the remote server.
Add the sequence of commands you currently run manually on the server to this script.

For the Django project, I wrote the following commands that pulls the latest code and restarts the services.

```python
#!/bin/bash
ssh -i "webapp.pem" ubuntu@example.com << EOF
cd /var/www/webapp/

echo "Switching to www-data user"
sudo -Hu www-data bash

echo "Pulling Latest Changes"
git pull

echo "Activating Virtual Environment"
source venv/bin/activate

echo "Installing any new libraries"
pip install -r requirements.txt

echo "Migrating Database"
python manage.py migrate

echo "Returning back to Ubuntu user"
exit

echo "Restarting Supervisor and Nginx"
sudo service supervisor restart
sudo service nginx restart

echo "Deployment Finished"
EOF
```

## Step 3:

Run the below command to change permissions of the script and make it executable.

```shell
chmod a+x deploy.sh
```

## Step 4:

Run the script and it will perform all the deployment.

```shell
./deploy.sh
```

This simple script has saved me a lot of time until the CI/CD process is in place.
