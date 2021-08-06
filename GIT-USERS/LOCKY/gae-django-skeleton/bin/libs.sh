#!/bin/bash

# Loop through ../libs to create symlinks to gluwa

LIB_DIR='../libs'

for LIB in `find $LIB_DIR -depth 1 -not -name '*egg-info'`
  do
    LIB_NAME=${LIB#'../libs/'}

    # ignore django and jinja2 since they are provided in GAE
    if [ "$LIB_NAME" != "django" ] && [ "$LIB_NAME" != "jinja2" ] ; then
      rm ../project_name/${LIB_NAME}
      ln -s ${LIB} ../project_name/${LIB_NAME}
      echo create symlink from ${LIB} to ../project_name/${LIB_NAME}
    fi
  done

rm six.py
ln -s ../libs/six.py ../project_name/six.py

# Create symlink from django's admin static folder to gluwa's static folder.
# We do this because GAE's django doesn't provide working solution to set it up.
cd static
rm admin
ln -s ../libs/django/contrib/admin/static/admin admin