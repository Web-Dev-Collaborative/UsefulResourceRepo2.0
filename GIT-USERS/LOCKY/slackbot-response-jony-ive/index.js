var fs = require('fs');
var Player = require('player');

var player = new Player([]);

var jsonData = JSON.parse(fs.readFileSync('jonyivesaid.json'));

var jonyivesVoice = [
  'http://jonyivesvoice.com/ive/1.mp3',
  'http://jonyivesvoice.com/ive/2.mp3',
  'http://jonyivesvoice.com/ive/3.mp3',
  'http://jonyivesvoice.com/ive/4.mp3',
  'http://jonyivesvoice.com/ive/5.mp3',
  'http://jonyivesvoice.com/ive/6.mp3',
  'http://jonyivesvoice.com/ive/7.mp3',
  'http://jonyivesvoice.com/ive/8.mp3',
  'http://jonyivesvoice.com/ive/9.mp3',
  'http://jonyivesvoice.com/ive/10.mp3',
  'http://jonyivesvoice.com/ive/11.mp3',
  'http://jonyivesvoice.com/ive/12.mp3',
  'http://jonyivesvoice.com/ive/13.mp3',
  'http://jonyivesvoice.com/ive/14.mp3',
  'http://jonyivesvoice.com/ive/15.mp3',
  'http://jonyivesvoice.com/ive/16.mp3',
  'http://jonyivesvoice.com/ive/17.mp3',
  'http://jonyivesvoice.com/ive/18.mp3',
  'http://jonyivesvoice.com/ive/19.mp3',
  'http://jonyivesvoice.com/ive/20.mp3',
  'http://jonyivesvoice.com/ive/21.mp3',
  'http://jonyivesvoice.com/ive/22.mp3',
  'http://jonyivesvoice.com/ive/23.mp3',
  'http://jonyivesvoice.com/ive/24.mp3',
  'http://jonyivesvoice.com/ive/25.mp3',
  'http://jonyivesvoice.com/ive/26.mp3',
  'http://jonyivesvoice.com/ive/27.mp3',
  'http://jonyivesvoice.com/ive/28.mp3',
];

var rand = jonyivesVoice[Math.floor(Math.random() * jonyivesVoice.length)];
player.add(rand);

player.play();
console.log(jsonData[rand.split('/').slice(-1).pop().split('.')[0]]);

player.on('error', function(err) {
  // console.log(err);
});

player.stop();
