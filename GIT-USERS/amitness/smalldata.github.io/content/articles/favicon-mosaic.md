Title: Fun with Favicons
Date: 2019-04-17 12:00
Category: programming
Tags: python, open data, 3 min read
Slug: favicon-mosaic
Authors: Philip Shemella

A recent [question](https://opendata.stackexchange.com/q/14007/1511) on the Open Data Stack Exchange site got me thinking about how to download favicons from a bulk list of websites.

###Idea 1: try each domain

Something like `http://example.com/favicon.ico`. But using a `favicon.ico` in the webroot folder is just a common implementation. Each website can host their favicon with another path, and another file format.

Let's try something else...

###Idea 2: parse html for favicon urls
If the website doesn't use `favicon.ico` in the webroot folder, the page html will contain a path to the favicon, with the following format:

    <link rel=icon href=/favicon.png>

There is python package aptly named [favicon](https://github.com/scottwernervt/favicon) that will parse the html and return the urls to all favicons, with different formats and resolutions. I'm pasting their demo code here:

```
>>> import favicon
>>> icons = favicon.get('https://www.python.org/')
Icon(url='https://www.python.org/static/apple-touch-icon-144x144-precomposed.png', width=144, height=144, format='png')
Icon(url='https://www.python.org/static/apple-touch-icon-114x114-precomposed.png', width=114, height=114, format='png')
Icon(url='https://www.python.org/static/apple-touch-icon-72x72-precomposed.png', width=72, height=72, format='png')
Icon(url='https://www.python.org/static/apple-touch-icon-precomposed.png', width=0, height=0, format='png')
Icon(url='https://www.python.org/static/favicon.ico', width=0, height=0, format='ico')
```

Getting better... But if I download bulk favicons, I'd like to avoid normalizing their file format and resolutions.

###Idea 3: get favicons directly from google's cache

Google keeps the favicon cached for many sites (even my little website with basically zero traffic).

    https://www.google.com/s2/favicons?domain=smalldata.dev

And the favicons are all normalized: 16x16 pixels and png format. Perfect.

# Now for some fun

A [top500 website list](https://moz.com/top500) has a [csv export](https://moz.com/top500/domains/csv) and wrote a Python script to download each of these 500 favicons from Google's cache and save to local folder `images/`.

```
import requests
import pandas as pd
import os
from io import StringIO

def request_function(domain):
	domain = domain.replace('/','')
	url = 'https://www.google.com/s2/favicons?domain=' + domain
	fav = requests.get(url).content
	with open('images'+os.sep+domain+'.png', 'wb') as handler:
		handler.write(fav)
	return

# top 500 websites from mozilla https://moz.com/top500
url = "https://moz.com:443/top500/domains/csv"
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0"}
req = requests.get(url, headers=headers)
data = StringIO(req.text)
df = pd.read_csv(data)
df.URL.apply(request_function)
```

###Favicon art

What to do with 500 favicons. For fun, I made a mosaic from the collection, and I first needed a original piece of art that would be recongnizable when heavily pixelated. Van Gogh's [Starry night](https://en.wikipedia.org/wiki/The_Starry_Night) stood out.

Here's the original:

![Starry Night]({attach}/images/1137px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg)

*Source*: [Wikipedia](https://en.wikipedia.org/wiki/The_Starry_Night#/media/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg)

Then I used a handy Python script called [mosaic.py](https://github.com/codebox/mosaic). No coding necessary.

    git clone https://github.com/codebox/mosaic.git
    python mosaic/mosaic.py source.jpg images/

And what pops out is a *Starry Night of Favicons*.

![Favicon Starry Night]({attach}/images/mosaic.jpeg)

---------

(full resolution download: [22 MB]({attach}/images/mosaic_full.jpeg))

(python [source code](https://gist.github.com/philshem/e59388197fd9ddb7dcdb8098f9f0aaf2))

(top500 favicons: [zip]({attach}/images/top500_favicons.zip))

