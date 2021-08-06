---
title: "Machine Learning Cookbook"
permalink: /cookbook/
date: 2020-10-26T00:00-00:00
excerpt: Code snippets for repetitive tasks in Machine Learning
toc: true
toc_sticky: true
---

This is a personal collection of repetitive commands and snippets for ML projects.

## AWS

**Specify key manually in boto3**  
{% gist 9c80648a506cfee097533c29cb424262 %}

**S3 operations on boto3**  
{% gist ed7daa09fb3440fafa3d0003b9693fab %}

**SNS operations on boto3**  
{% gist 4951d014e2e81e0a33ad01a65568cfb6 %}

**AWS ML services**  
{% gist c19a8c2e297bf50fde70471911e76ccc %}

**Enable static website hosting on S3**  
Enable hosting

```shell
aws s3 website s3://somebucket --index-document index.html
```

Goto `Permissions > Public Access Settings > Edit` and change (`Block new public bucket policies`, `Block public and cross-account access if bucket has public policies`, and `Block new public ACLs and uploading public objects`) to false.

Navigate to `Permissions > Bucket Policy` and paste this policy.
{% gist 4a78d1e72517645f8cead3a8f92bc677 %}

## Conda

**Install OpenCV in conda**

```shell
conda install -c conda-forge open-cv
```

**Update conda**

```shell
conda update -n base -c defaults conda
```

**Make binaries work on Mac**

```shell
sudo xcode-select --install
conda install clang_osx-64 clangxx_osx-64 gfortran_osx-64
```

**Create/Update conda environment from file**

```shell
conda env create -f environment.yml
conda env update -f environment.yml
```

**Install CUDA toolkit in conda**

```shell
conda install cudatoolkit=9.2 -c pytorch
conda install cudatoolkit=10.0 -c pytorch
```

**Disable auto-activation of conda environment**

```shell
conda config --set auto_activate_base false
```

**Disable multithreading in numpy**

```shell
export OMP_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1
export OPENMP_NUM_THREADS=1
export MKL_NUM_THREADS=1
```

**Faster alternatives to Conda**

| Docker Image                                                            | Remarks                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------ |
| [micromaba-docker](https://github.com/mamba-org/micromamba-docker)      | Small binary version of mamba                    |
| [condaforge/mambaforge](https://hub.docker.com/r/condaforge/mambaforge) | Docker image with conda-forge and mamba          |
| [condaforge/miniforge](https://github.com/conda-forge/miniforge)        | Docker image with conda-forge as default channel |

## Celery

**Run celery workers**  
File `tasks.py` contains celery object, concurrency is set to 1 and no threads or process are used with `-P solo`

```shell
celery -A tasks.celery worker --loglevel=info -P solo
```

**Start flower server to monitor celery**  
{% gist 1b93ae88d83009dd1eff998e96a8d4db %}

**Use flower from docker-compose**  
{% gist 9a43c5708db77a2842f4eadf13b0d2e9 %}

## Docker

**Start docker-compose as daemon**

```shell
docker-compose up --build -d
```

**Use journald as logging driver**  
Edit `/etc/docker/daemon.json`, add this json and restart.

```json
{
  "log-driver": "journald"
}
```

**Send logs to CloudWatch**

```shell
sudo nano /etc/docker/daemon.json
```

{% gist 78068e11e1cc31eedf07efe2228613fd %}

```shell
sudo systemctl daemon-reload
sudo service docker restart
```

**Set environment variable globally in daemon**

```shell
mkdir -p /etc/systemd/system/docker.service.d/
sudo nano /etc/systemd/system/docker.service.d/aws-credentials.conf
```

{% gist 9e62dbd1e1115038f2562076e6738c4b %}

```shell
sudo systemctl daemon-reload
sudo service docker restart
```

**Disable pip cache and version check**

```shell
ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1
```

**Dockerfile for FastAPI**  
{% gist ac87e33d8522f5734e5b9c085bca86ae %}

**Return exit code in docker-compose**

```shell
docker-compose up --abort-on-container-exit --exit-code-from worker
```

**Change entrypoint of Dockerfile in compose**  
{% gist fd1c143e9488c6715f7a1e6313e50321 %}

## FastAPI

**Use debugging mode**  
{% gist 38ec3f01fc77026f8ace72b3d9d31cfc %}

**Enable CORS**  
{% gist ec3e27028aa5d46f45fd0aeb435723f1 %}

**Raise HTTP Exception**  
{% gist 8cd45995fcd3bd48662369e0db7f429f %}

**Run FastAPI in Jupyter Notebook**  
{% gist 5702a2c3787749a783360c0129133408 %}

**Mock ML model in test case**  
{% gist a3f049b9675039c164ef17c6b414f7a3 %}

## Flask

**Test API in flask**
{% gist ff5579911c0eb7d4aa193596e02b9135 %}

**Load model only once before first request**
{% gist b471ceba9b0e6268aa5818ff82a36177 %}

## Gensim

**Load binary format in Word2Vec**

```python
from gensim.models import KeyedVectors
model = KeyedVectors.load_word2vec_format('model.bin',
                                          binary=True)
model.most_similar('apple')
```

## Git

**Prevent git from asking for password**

```shell
git config credential.helper 'cache --timeout=1800'
```

**Whitelist in .gitignore**  
{% gist 416ea3274dfd05509ab3c12a4c222a2e %}

**Clone private repo using personal token**

Create token from [settings](https://github.com/settings/tokens) and run:

```shell
git clone https://<token>@github.com/amitness/example.git
```

**Create alias to run command**

```shell
# git test
git config --global alias.test "!python -m doctest``"
```

**Install Git LFS**

```shell
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
```

**Triggers for GitHub Action**  
{% gist c2c60e7dbb5fa0f3b6161d018014371a %}

**Useful GitHub Actions**

| Action                                                                                                 | Remarks                        |
| ------------------------------------------------------------------------------------------------------ | ------------------------------ |
| [scrape.yml](https://github.com/simonw/cdc-vaccination-history/blob/main/.github/workflows/scrape.yml) | Scrap webpage and save to repo |

## Gunicorn

**Increase timeout**

```shell
gunicorn --bind 0.0.0.0:5000 main:app --timeout 6000
```

**Check error logs**

```shell
tail -f /var/log/gunicorn/error_
```

**Run two workers**

```shell
gunicorn main:app  --preload -w 2 -b 0.0.0.0:5000
```

**Use pseudo-threads**  
If `CPU cores=1`, then suggested concurrency = `2*1+1=3`

```shell
gunicorn main:app --worker-class=gevent --worker-connections=1000 --workers=3
```

**Use multiple threads**  
If `CPU cores=4`, then suggested concurrency = `2*4+1=9`

```shell
gunicorn main:app --workers=3 --threads=3
```

**Use in-memory file system for heartbeat file**

```shell
gunicorn --worker-tmp-dir /dev/shm
```

## Huey

**Add background task to add 2 numbers**  
{%gist c2ec5221c1d759c43f77111c438d13e5 %}

## Jupyter

**Auto-import common libraries**

1. Create `startup` folder in `~/.ipython/profile_default`
2. Create a python file `start.py`
3. Add imports there.

```python
# start.py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

**Make auto-reload of modules by default**

1. Create `startup` folder in `~/.ipython/profile_default`
2. Add this file
   {% gist f466f85ca2b7e7d93386547737c36a4d %}

**Auto print all expressions**  
Edit `~/.ipython/profile_default/ipython_config.py` and add
{% gist c008ad727ffed8a435f5829ecc157f23 %}

**Add conda kernel to jupyter**  
Activate conda environment and run below command.

```shell
pip install --user ipykernel
python -m ipykernel install --user --name=condaenv
```

**Add R kernel to jupyter**

```shell
conda install -c r r-irkernel

# Link to fix issue with readline
cd /lib/x86_64-linux-gnu/
sudo ln -s libreadline.so.7.0 libreadline.so.6
```

**Start notebook on remote server**

```shell
jupyter notebook --ip=0.0.0.0 --no-browser
```

**Serve as voila app**

```shell
voila --port=$PORT --no-browser app.ipynb
```

**Enable widgets in jupyter lab**

```shell
pip install jupyterlab
pip install ipywidgets
jupyter nbextension enable --py widgetsnbextension
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

**Switch to language server in jupyter lab**

```shell
pip install — pre jupyter-lsp
jupyter labextension install @krassowski/jupyterlab-lsp
pip install python-language-server[all]
```

## Kaggle

**Add kaggle credentials**

```shell
pip install --upgrade kaggle kaggle-cli

mkdir ~/.kaggle
mv kaggle.json ~/.kaggle
chmod 600 /root/.kaggle/kaggle.json
```

## Linux

**Zip a folder**

```shell
zip -r folder.zip folder
```

**Use remote server as VPN**

```shell
ssh -D 8888 -f -C -q -N ubuntu@example.com
```

**SSH Tunneling for multiple ports (5555, 5556)**

```shell
ssh -N -f -L localhost:5555:127.0.0.1:5555 -L localhost:5556:127.0.0.1:5556 ubuntu@example.com
```

**Reverse SSH tunneling**  
Enable `GatewayPorts=yes` in `/etc/ssh/sshd_config` on server.

```shell
ssh -NT -R example.com:5000:localhost:5000 ubuntu@example.com -i ~/.ssh/xyz.pem -o GatewayPorts=yes
```

**Copy remote files to local**

```shell
scp ubuntu@example.com:/mnt/file.zip .
```

**Set correct permission for PEM file**

```shell
chmod 400 credentials.pem
```

**Clear DNS cache**

```shell
sudo service network-manager restart
sudo service dns-clean
sudo systemctl restart dnsmasq
sudo iptables -F
```

**Unzip .xz file**

```shell
sudo apt-get install xz-utils
unxz ne.txt.xz
```

**Disable password-based login on server**  
Edit this file and set `PasswordAuthentication` to `no`

```shell
sudo nano /etc/ssh/sshd_config
```

**Auto-generate help for make files**  
{% gist 14ba10992f7437cfac2b7a64a8f0a67a %}

**Rebind prefix for tmux**  
Edit `~/.tmux.conf` with below content and reload by running `tmux source-file ~/.tmux.conf`
{% gist 53fc232f5ce70b8b773e4abf8bbcf13a %}

**Clear DNS cache**

```shell
sudo systemd-resolve --flush-caches
```

**Reset GPU**

```shell
sudo rmmod nvidia_uvm
sudo modprobe nvidia_uvm
```

## Markdown

**Add comparison of code blocks side by side**  
[Solution](https://stackoverflow.com/a/59314488/10137343)

## Nginx

**Assign path to port**

```shell
location /demo/ {
                proxy_pass http://localhost:5000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
	}
```

**Increase timeout for nginx**  
Default timeout is 60s. Run below command or use [alternative](https://blogs.agilefaqs.com/tag/proxy_read_timeout/).

```shell
sudo nano /etc/nginx/proxy_params
```

{% gist d9f2ee92288d1fdf512ee46be780814a %}

**Setup nginx for prodigy**  
{% gist 2cc8f79a12a89e6cd22857c5bab49c8c %}

## NLTK

**Get list of all POS tags**

```python
import nltk
nltk.download('tagsets')
nltk.help.upenn_tagset()
```

## NPM

**Upgrade to latest node version**

```shell
npm cache clean -f
npm install -g n
n stable
```

## Pandas

**Save with quoted strings**

```python
df.to_csv('data.csv',
            index=False,
            quotechar='"',
            quoting=csv.QUOTE_NONNUMERIC)
```

## Postgres

**Import database dump**  
If database name is `test` and user is `postgres`.

```shell
pg_restore -U postgres -d test < example.dump
```

## Pycharm

**Add keyboard shortcut for custom command**  
[Link](https://intellij-support.jetbrains.com/hc/en-us/community/posts/207070295/comments/207021015)

**Enable pytest as default test runner**  
![](/images/pytest-pycharm.png){:.align-center}

## Pydantic

**Allow camel case field name from frontend**  
{%gist 97f5d44088ddf5ffa97f0cdb4b3360ba %}

**Validate fields**  
{% gist f9cc1f2afa48762aad5352aeb3043777 %}

## Python

**Install build utilities**

```shell
sudo apt update
sudo apt install build-essential python3-dev
sudo apt install python-pip virtualenv
```

**Install mysqlclient**

```shell
sudo apt install libmysqlclient-dev mysql-server
pip install mysqlclient
```

**Get memory usage of python script**

```python
import os
import psutil
process = psutil.Process(os.getpid())
print(process.memory_info().rss)
```

**Convert python package to command line tool**  
{% gist a2889d272afdd5a454230f00d2079104 %}

{% gist 6883909479adb11c0f3fee924175f21d %}

**Install package from TestPyPi**

```shell
pip install --index-url https://test.pypi.org/simple
	    --extra-index-url https://pypi.org/simple
	    example-package
```

**Test multiple python versions using tox**  
{% gist c4a895952a1b33c3429e1cd1e4b81e5d %}

**Flake8: Exclude certain checks**  
Place `setup.cfg` alongside `setup.py`.
{% gist 1945560267d80062c63f88a87ade299f %}

**Send email with SMTP**

- Enable `less secure app access` in [settings](https://myaccount.google.com/lesssecureapps) of gmail.
  {% gist 7a806edddd79f2e7e0e743ec756ca4e5 %}

**Run selenium on chromium**

```shell
sudo apt update
sudo apt install chromium-chromedriver
cp /usr/lib/chromium-browser/chromedriver /usr/bin
pip install selenium
```

{% gist 67183908ecaa28e57bfcc444eb28a9a3 %}

**Generate fake user agent in selenium**  
Run `pip install fake_useragent`.

{% gist 35d9049ac4d742a3ac472271e9c658db %}

## PyTorch

**Install CPU-only version of PyTorch**

```shell
conda install pytorch torchvision cpuonly -c pytorch
```

**Auto-select proper pytorch version based on GPU**

```shell
pip install light-the-torch
ltt install torch torchvision
```

**Set random seed**

```python
seed = 42
random.seed(seed)
np.random.seed(seed)
torch.manual_seed(seed)
torch.cuda.manual_seed_all(seed)
```

**Create custom transformation**  
{% gist d5b8d17d2d31987c687b52185a978b0f %}

## Pytest

**Disable warnings in pytest**  
{% gist 67534a1fc7cc0ec98613d748a2b2b039 %}

## Pytorch Lightning

**Use model checkpoint callback**  
{% gist a64feca21ea6afbe3e873dbdbed7f384 %}

## Redis

**Connect to redis from commandline**

```shell
redis-cli -h 1.1.1.1 -p 6380 -a password
```

**Connect to local redis**  
{% gist 73c6f7c46e9d2ac076ee7285d92f3855 %}

**Use URL for redis**  
If password is present:

```
redis://:{password}@{hostname}:{port}/{db_number}
```

else

```
redis://{hostname}:{port}/{db_number}
```

**Add password to redis server**

Edit `/etc/redis/redis.conf` file.

```shell
sudo nano /etc/redis/redis.conf
```

Uncomment this line and set password.

```shell
# requirepass yourpassword
```

Restart redis server.

```shell
sudo service redis-server restart
```

**Enable cluster mode locally**

- Edit `/etc/redis/redis.conf` file.

```shell
sudo nano /etc/redis/redis.conf
```

- Uncomment this line and save file.
  {% gist cf2ac62e38d2e20ff06e52ac49ae58df %}

- Restart redis server.

```shell
sudo service redis-server restart
```

## Requests

**Post JSON data to endpoint**

```python
import requests

headers = {'Content-Type': 'application/json'}
data = {}
response = requests.post('http://example.com',
                         json=data,
                         headers=headers)
```

**Use random user agent in requests**  
{% gist f97ad3502d2e7321e0a38ac10bb11df2 %}

**Use rate limit and backoff in API**  
{% gist 740413007cdc3505e04f0b5ea40cb01c %}

## SSH

**Add server alias to SSH config**  
Add to `~/.ssh/config`

{% gist edf6f3333146eb6ab2df0113f23dd837 %}

## Streamlit

**Disable CORS**  
Create `~/.streamlit/config.toml`

```shell
[server]
enableCORS = false
```

**File Uploader**

```python
file = st.file_uploader("Upload file",
                        type=['csv', 'xlsx'],
                        encoding='latin-1')
df = pd.read_csv(file)
```

**Create download link for CSV file**  
{% gist b5cc45a87952e20d2c17b933c64d6be1 %}

**Run on docker**  
{% gist 48c92eba1bc5ed8d9eb4dc784559f4c7 %}

**Docker compose for streamlit**

![](/images/streamlit-docker-compose.png){:.align-center}

Add `Dockerfile` to app folder.
{% gist 6573c17effd3c6245ace31994245a1c1 %}

Add `project.conf` to nginx folder.
{% gist 632911fe32f11f859799344baa196e9e %}

Add `Dockerfile` to nginx folder.
{% gist bf8cc293f79ef414bb0a2b611b483034 %}

Add `docker-compose.yml` at the root
{% gist 375deb78641bc23c79b5127d668fcb03 %}

**Run on heroku**  
Add `requirements.txt`, create [Procfile](https://github.com/arvkevi/nba-roster-turnover/blob/master/Procfile) and [setup.sh](https://github.com/arvkevi/nba-roster-turnover/blob/master/setup.sh).

**Deploy streamlit on google cloud**  
Create [Dockerfile](https://github.com/Jcharis/Streamlit_DataScience_Apps/blob/master/Deploying_Streamlit_Apps_To_GCP/Dockerfile), [app.yaml](https://github.com/Jcharis/Streamlit_DataScience_Apps/blob/master/Deploying_Streamlit_Apps_To_GCP/app.yaml) and run:

```shell
gcloud config set project your_projectname
gcloud app deploy
```

**Render SVG**  
{% gist 6d32bc45b4eafb619126a9e7549fda71 %}

## Tensorflow

**Install CPU-only version of Tensorflow**

```shell
conda install tensorflow-mkl
```

or

```shell
pip install tensorflow-cpu==2.1.0
```

**Install custom builds for CPU**

Find link from [https://github.com/lakshayg/tensorflow-build](https://github.com/lakshayg/tensorflow-build)

```shell
pip install --ignore-installed --upgrade "url"
```

**Install with GPU support**

```shell
conda create --name tensorflow-22 \
    tensorflow-gpu=2.2 \
    cudatoolkit=10.1 \
    cudnn=7.6 \
    python=3.8 \
    pip=20.0
```

**Use only single GPU**

```shell
export CUDA_VISIBLE_DEVICES=0
```

**Allocate memory as needed**

```shell
export TF_FORCE_GPU_ALLOW_GROWTH='true'
```

**Enable XLA**

```python
import tensorflow as tf
tf.config.optimizer.set_jit(True)
```

**Load saved model with custom layer**  
{% gist 36ac239ce8da187ccd454dc2962eb075 %}

**Ensure Conda doesn't cause tensorflow issue**  
{% gist 5c63f2101652ecbeadf5e5c505d40922 %}

**Upload tensorboard data to cloud**

```shell
tensorboard dev upload --logdir ./logs \
    --name "XYZ" \
    --description "some model"
```

**Use TPU in Keras**  
[TPU survival guide on Google Colaboratory](https://maelfabien.github.io/bigdata/ColabTPU/#connect-the-tpu-and-test-it)

**Use universal sentence encoder**  
{% gist acea96a3ceb801de6ea7a27c9f112645 %}

## Textblob

**Backtranslate a text**  
{% gist d1c3d33098b00aa7362b0e753352cc9a %}
