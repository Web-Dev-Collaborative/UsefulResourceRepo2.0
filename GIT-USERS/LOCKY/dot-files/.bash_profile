alias ls='ls -lG'
alias cd-universiy='cd ~/Documents/OneDrive/University'
alias cd-project='cd ~/Documents/OneDrive/Projects'
alias chrome='open -a "Google Chrome"'
#export PATH=/usr/local/bin:$PATH
# Mysql
export PATH=~/bin:/usr/local/mysql/bin:$PATH
export PATH=/usr/local/Cellar/ruby/2.1.0/bin:$PATH
export PATH=/usr/local/Cellar/sqlite/3.8.2/bin:$PATH

# Adding color to the shell.
export CLICOLOR=1
export LSCOLORS=gxBxhxDxfxhxhxhxhxcxcx

#For Virtualenv
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh

# Solve the problems about ValueError: unknown locale: UTF-8
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# For Setting Google SQL Cloud
export GAE="/usr/local/google_appengine"
export PYTHONPATH="$PYTHONPATH:$GAE:$GAE/lib/dango-1.5"
export PATH="${PATH}:$GAE/lib/django-1.5/django/bin"

# --- For Google VM ---
# The next line updates PATH for the Google Cloud SDK.
#source '/Users/Calvin/google-cloud-sdk/path.bash.inc'

# The next line enables bash completion for gcloud.
#source '/Users/Calvin/google-cloud-sdk/completion.bash.inc'
source /usr/local/opt/nvm/nvm.sh
