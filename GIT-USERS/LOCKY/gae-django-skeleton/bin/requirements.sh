#!/bin/bash

# install requirements separately to /libs
pip install -r ../requirements/local.txt -t ../libs

# create symlinks of your libraries into your project directory
./libs.sh