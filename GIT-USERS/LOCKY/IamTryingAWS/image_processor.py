#!/usr/bin/python
try:
   import boto
except:
   os.system("echo 'boto error' >> py_log")
import json
import time
import sys
import getopt
import argparse
import os
import logging
import StringIO
import uuid
import math
import httplib
import urllib
import base64
from boto.sqs.message import RawMessage
from boto.sqs.message import Message
from boto.s3.key import Key
os.path.join('/usr/bin/convert', '/usr/bin/montage')
##########################################################
# Connect to SQS and poll for messages
##########################################################
def main(argv=None):
        os.system("echo 'the process is running' >> py_log")
	# Handle command-line arguments for AWS credentials and resource names
	parser = argparse.ArgumentParser(description='Process AWS resources and credentials.')
	parser.add_argument('--input-queue', action='store', dest='input_queue', required=False, default="cp04-input-queue", help='SQS queue from which input jobs are retrieved')
	parser.add_argument('--output-queue', action='store', dest='output_queue', required=False, default="cp04-output-queue", help='SQS queue to which job results are placed')
	parser.add_argument('--s3-output-bucket', action='store', dest='s3_output_bucket', required=False, default="", help='S3 bucket where list of instances will be stored')
	parser.add_argument('--region', action='store', dest='region', required=False, default="", help='Region that the SQS queus are in')
	args = parser.parse_args()

	# Get region
	region_name = args.region

	# If no region supplied, extract it from meta-data
	if region_name == '':
		conn = httplib.HTTPConnection("169.254.169.254", 80)
		conn.request("GET", "/latest/meta-data/placement/availability-zone/")
		response = conn.getresponse()
		region_name = response.read()[:-1]
	info_message('Using Region %s' % (region_name))

	# Set queue names
	input_queue_name = args.input_queue
	output_queue_name = args.output_queue

	# Get S3 endpoint
	s3_endpoint = [region.endpoint for region in boto.s3.regions() if region.name == region_name][0]

	# Get S3 bucket, create if none supplied
	s3_output_bucket = args.s3_output_bucket
	if s3_output_bucket == "":
	  s3_output_bucket = create_s3_output_bucket(s3_output_bucket, s3_endpoint, region_name)

	info_message('Retrieving jobs from queue %s. Processed images will be stored in %s and a message placed in queue %s' % (input_queue_name, s3_output_bucket, output_queue_name))

	try:
		# Connect to SQS and open queue
		sqs = boto.sqs.connect_to_region(region_name)
	except Exception as ex:
		error_message("Encountered an error setting SQS region.  Please confirm you have queues in %s." % (region_name))
		sys.exit(1)
	try:
		input_queue = sqs.get_queue(input_queue_name)
		input_queue.set_message_class(RawMessage)
	except Exception as ex:
		error_message("Encountered an error connecting to SQS queue %s. Confirm that your input queue exists." % (input_queue_name))
		sys.exit(2)

	try:
		output_queue = sqs.get_queue(output_queue_name)
		output_queue.set_message_class(RawMessage)
	except Exception as ex:
		error_message("Encountered an error connecting to SQS queue %s. Confirm that your output queue exists." % (output_queue_name))
		sys.exit(3)

	info_message("Polling input queue...")
	
	while True:
		# Get messages
                #os.system("echo 'listening..' >> py_log")
		rs = input_queue.get_messages(num_messages=1)
		if len(rs) > 0:
                        os.system("echo 'The size %s' >> py_log" % (str(len(rs))))
			# Iterate each message
			for raw_message in rs:
				info_message("Message received...")
				# Parse JSON message (going two levels deep to get the embedded message)
				message = raw_message.get_body()

				# Create a unique job id
				job_id = str(uuid.uuid4())

				# Process the image, creating the image montage
				output_url = process_message(message, s3_output_bucket, s3_endpoint, job_id)

				# Sleep for a while to simulate a heavy workload
				# (Otherwise the queue empties too fast!)
				time.sleep(15)

				output_message = "Output available at: %s" % (output_url)

				# Write message to output queue
				write_output_message(output_message, output_queue)

				info_message(output_message)
				info_message("Image processing completed.")

				# Delete message from the queue
				input_queue.delete_message(raw_message)

		time.sleep(5)

##############################################################################
# Process a newline-delimited list of URls
##############################################################################
def process_message(message, s3_output_bucket, s3_endpoint, job_id):
	try:
		output_image_name = "output-%s.jpg" % (job_id)
                # Download images from URLs specified in message
		os.system("mkdir %s" % job_id)
                for line in message.splitlines():
			info_message("Downloading image from %s" % line)
                        os.system("echo 'Download image from %s' >> py_log" % line)
			import wget
                        filename = wget.download(line)
                        os.system("mv /home/ec2-user/%s %s" % (filename, "/home/ec2-user/" + job_id))
                os.system("echo output-dir %s >> py_log" % job_id)
                output_dir = "/home/ec2-user/%s/" % job_id
		output_image_path = output_dir + output_image_name
		#os.system("montage -size 400x400 null: %s*.* null: -thumbnail 400x400 -bordercolor white -background black +polaroid -resize 80%% -gravity center -background black -geometry -10+2  -tile x1 %s" % ("/home/ec2-user/" + job_id, output_image_path))
                os.system("convert %s -set colorspace Gray -separate -average %s" % (output_dir + filename, output_image_path))
                output_url = write_image_to_s3(output_image_path, output_dir, output_image_name, s3_output_bucket, s3_endpoint)
		os.system("echo %s >> py_log" % output_url)
                return output_url
	except:
		os.system("echo 'error' >> py_log")
                error_message("An error occurred. Please show this to your class instructor.")
		error_message(sys.exc_info()[0])
##############################################################################
# Write the result of a job to the output queue
##############################################################################
def write_output_message(message, output_queue):
	m = RawMessage()
	m.set_body(message)
	status = output_queue.write(m)
##############################################################################
# Write an image to S3
##############################################################################
def write_image_to_s3(path, odir, file_name, s3_output_bucket, s3_endpoint):
	# Connect to S3 and get the output bucket
	s3 = boto.connect_s3(host=s3_endpoint)
	output_bucket = s3.get_bucket(s3_output_bucket)
        os.system("echo 's3 1' >> py_log") 
	# Create a key to store the instances_json text
	k = Key(output_bucket)
        os.system("echo 's3 2' >> py_log")
	k.key = "out/" + file_name
        os.system("echo 's3 3' >> py_log")
	k.set_metadata("Content-Type", "image/jpeg")
        os.system("echo 's3 4' >> py_log")
	k.set_contents_from_filename(path)
        os.system("echo 's3 5' >> py_log")
	k.set_acl('public-read')
        os.system("echo 's3 6' >> py_log")
	# Return a URL to the object
        os.system("mv %s %s" % (odir, "/home/ec2-user/jobs/"))
	os.system("mv %s %s" % (odir, "/home/ec2-user/jobs/"))
        send_sns("https://%s.s3.amazonaws.com/%s" % (s3_output_bucket, k.key))
        return "https://%s.s3.amazonaws.com/%s" % (s3_output_bucket, k.key)

def send_sns(u):
        c = boto.connect_sns("us-east-1")
        topicarn = "--"
        message = "Hey, Dear User\n We have an awesome picture with grayscale for you\n check that here:\n%s" % u
        message_subject = "Graystyle! New image was added!"
        publication = c.publish(topic=topicarn, message = message, subject = message_subject)
##############################################################################
# Verify S3 bucket, create it if required
##############################################################################
def create_s3_output_bucket(s3_output_bucket, s3_endpoint, region_name):

	# Connect to S3
	s3 = boto.connect_s3(host=s3_endpoint)
	# Find any existing buckets starting with 'image-bucket'
	buckets = [bucket.name for bucket in s3.get_all_buckets() if bucket.name.startswith('cp04-image-bucket')]

    	if len(buckets) > 0:
             return buckets[0]

    # No buckets, so create one for them
	name = 'cp04-image-bucket-' + str(uuid.uuid4())
	s3.create_bucket(name, location=region_name)
	return name
##############################################################################
# Use logging class to log simple info messages
##############################################################################
def info_message(message):
	logger.info(message)

def error_message(message):
	logger.error(message)

##############################################################################
# Generic stirng logging
##############################################################################
class Logger:
	def __init__(self):
		#self.stream = StringIO.StringIO()
		#self.stream_handler = logging.StreamHandler(self.stream)
		self.file_handler = logging.FileHandler('/home/ec2-user/image_processor.log')
		self.log = logging.getLogger('image-processor')
		self.log.setLevel(logging.INFO)
		for handler in self.log.handlers:
			self.log.removeHandler(handler)
		self.log.addHandler(self.file_handler)
	def info(self, message):
		self.log.info(message)
	def error(self, message):
		self.log.error(message)

logger = Logger()

if __name__ == "__main__":
    sys.exit(main())
