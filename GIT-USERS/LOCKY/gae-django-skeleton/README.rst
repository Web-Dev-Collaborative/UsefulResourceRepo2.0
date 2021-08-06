==================
gae-django-project
==================

A project template for Django 1.5 used in Google Cloud Platform (Google App Engine, Google Cloud SQL, and Google Cloud Storage).

To use this project follow these steps:

#. Create your working environment
#. Install Django
#. Create the new project using the gae-django-skeleton template
#. Install additional dependencies
#. Use the Django admin to create the project

*note: these instructions show creation of a project called "icecream".  You
should replace this name with the actual name of your project.*

Sample
======
There is a sample project code based on this skeleton:
https://github.com/gluwa/shiny-ironman

Working Environment
===================

You have several options in setting up your working environment.  We recommend
using virtualenv to separate the dependencies of your project from your system's
python environment.  If on Linux or Mac OS X, you can also use virtualenvwrapper to help manage multiple virtualenvs across different projects.

Virtualenv Only
---------------

First, make sure you are using virtualenv (http://www.virtualenv.org). Once
that's installed, create your virtualenv::

    $ virtualenv --distribute icecream

You will also need to ensure that the virtualenv has the project directory
added to the path. Adding the project directory will allow `django-admin.py` to
be able to change settings using the `--settings` flag.

Virtualenv with virtualenvwrapper
--------------------------

In Linux and Mac OSX, you can install virtualenvwrapper (http://virtualenvwrapper.readthedocs.org/en/latest/),
which will take care of managing your virtual environments and adding the
project path to the `site-directory` for you::

    $ mkdir icecream
    $ mkvirtualenv -a icecream icecream-dev
    $ add2virtualenv `pwd`

Windows
----------

In Windows, or if you're not comfortable using the command line, you will need
to add a `.pth` file to the `site-packages` of your virtualenv. If you have
been following the book's example for the virtualenv directory (pg. 12), then
you will need to add a python pathfile named `_virtualenv_path_extensions.pth`
to the `site-packages`. If you have been following the book, then your
virtualenv folder will be something like::

    `~/.virtualenvs/icecream/lib/python2.7/site-directory/`

In the pathfile, you will want to include the following code (from
virtualenvwrapper):

    import sys; sys.__plen = len(sys.path)
    /home/<youruser>/icecream/icecream/
    import sys; new=sys.path[sys.__plen:]; del sys.path[sys.__plen:]; p=getattr(sys,'__egginsert',0); sys.path[p:p]=new; sys.__egginsert = p+len(new)

Installing Django
=================

To install Django in the new virtual environment, run the following command::

    $ pip install django<1.6

*note: This skeleton is specifically for django 1.5.*

Creating your project
=====================

To create a new Django project called '**icecream**' using
django-twoscoops-project, run the following command::

    $ django-admin.py startproject --template=https://github.com/gluwa/gae-django-skeleton/archive/master.zip --extension=py,rst,html,sh,yaml icecream_project

Installation of Dependencies
=============================

Since you need to upload your dependencies to GAE along with your project,
you need to install them to the project folder. **requirements.sh** in
the project root directory will install requirments to **libs** directory,
and **libs.sh** in the project directory will create symlinks from **libs** directory
to the project directory.

Depending on where you are installing dependencies::

    $ ./requirements.sh
    $ cd icecream
    $ ./lib.sh

In case you get::

    -bash: ./requirements.sh: Permission denied

Retry after granting the necessary permissions::

    $ chmod 777 ./requirements.sh

or::

    $ chmod 777 ./lib.sh

*note: We install production requirements this way because many Platforms as a
Services expect a requirements.txt file in the root of projects.*

Google Cloud Platform
=====================

You need Google Cloud SQL and Google Cloud Storage to use your Django code as-is on Google App Engine.

Google Cloud SQL
----------------

Refer to the link below and connect Google Cloud SQL to your project.

https://developers.google.com/appengine/docs/python/cloud-sql/django

Google Cloud Storage
--------------------

Refer to the link below and connect Google Cloud Storage to your project.

https://developers.google.com/storage

Fix **gae.py**, **local.py**, and **producttion.py** under **icecream/settings** folder.

Acknowledgements
================

- Two Scoops: https://django.2scoops.org/
- Django-nonrel: http://django-nonrel.org/
- JetBrains: http://www.jetbrains.com/
