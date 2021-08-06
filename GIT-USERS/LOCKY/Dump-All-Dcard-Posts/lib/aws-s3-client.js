var s3 = require('s3');
var credential = require('../s3-setting');

if (credential.id === '' || credential.key === '') {
  console.error('Please specify your credential of S3.');
  process.exit();
}

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: credential.id,
    secretAccessKey: credential.key
  }
});

module.exports = client;
