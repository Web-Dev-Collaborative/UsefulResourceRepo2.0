# Note for aws & os setting.
## Initial bash script for first instance.
    
    #!/bin/bash  
    sudo yum install -y ImageMagick
    sudo easy_install argparse
    mkdir /home/ec2-user/jobs
    wget -O image_processor.py https://raw.githubusercontent.com/lockys/IamTestingAWSS3/master/image_processor.py
    
## Check out the fucking process if exit or not

    ps -fa | grep image_processor.py

## Start script right after network is ready.

    sudo vi /sbin/ifup-local

### Example, take interface "eth0" for instance.
    
    #!/bin/sh
    #!/usr/bin/python
    if [[ "$1" == "eth0" ]]
    then
        ping 8.8.8.8 -c 5 >> /home/ec2-user/log_eht0
        pushd . > /dev/null 2>&1
        cd /home/ec2-user/
        /usr/bin/python image_processor.py &
        popd > /dev/null 2>&1
    else
        ping 8.8.8.8 -c 5 >> /home/ec2-user/log
        
### change r-w-x permission for that file.

     sudo chmod +x /sbin/ifup-local
        
