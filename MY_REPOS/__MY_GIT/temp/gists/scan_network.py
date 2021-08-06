import os
import re

output = os.popen('arp -a').read().splitlines()

ips = [re.search(r'\d+\.\d+\d+.\d+.\d+', b).group(0) for b in output]

for ip in ips:
	print(os.popen('nmblookup -A {}'.format(ip)).read())