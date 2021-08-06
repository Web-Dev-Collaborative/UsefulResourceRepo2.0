# Dcard Post Dumper

Usage:
==
- Dump posts of [Dcard](https://www.dcard.tw/) and save it in JSON Format.
- You can optionally upload these posts to AWS S3.
- Record the last post ID you saved before so that you won't dump the same posts agian.   
  You can configure the file  **[stop-point.json](https://github.com/lockys/Dcard-Post-Dumper/blob/master/stop-point.json)** if   you want to dump it again, the value **20000** means that your will dump the posts from the post whose ID number is 20000 to    the latest post ID.

Get started:
==
```
$ git clone https://github.com/lockys/Dcard-Post-Dumper.git
$ cd Dcard-Post-Dumper
$ node index.js
Dcard Post Dumper
1.0.0 alpha edition @ 2015/07/17
[*] I wake up, getting posts now.
[!] Latest Post ID is 384947
```
Upload to S3:
==
Specify your credential id and key of AWS S3 in **[s3-setting.js](https://github.com/lockys/Dcard-Post-Dumper/blob/master/s3-setting.js)** and DO NOT forget to create a bucket for your posts.
```
# Enable the functionality of uploading to S3
$ node index.js -s <bucket-name> 
```
LICENCE:
==
MIT
