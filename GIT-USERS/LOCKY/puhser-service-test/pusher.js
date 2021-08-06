var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '135069',
  key: '020b0f5d10c56938e83b',
  secret: 'c6aef70e2b9fce276069',
  encrypted: true,
});
pusher.port = 443;
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  pusher.trigger('test_channel', 'my_event', {
    message: chunk,
  });
});
