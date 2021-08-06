whoSay.js
==
whoSay.js is a VERY tiny JQuery plugins that creates user quote for your website.  
[Simple Demo](http://lockys.github.io/whoSayJS/)
### Usage
Include files

```html
<html>
<header>
  <link rel="stylesheet" href="./dist/who-say.min.css" media="screen" charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js" charset="utf-8"></script>
  <script src="./dist/who-say.min.js" charset="utf-8"></script>
  <script type="text/javascript">
    $(document).ready(function() {
      $('.quote').whoSay();
    });
  </script>
</header>
<body>
  <div class="quote">
  </div>
</body>
</html>
```
options
```javascript
var options = {
  timeOut: 6000,
  quoteList: [
    {
      talk: '國相到以片南，過底不費研大布有一成子健服人令歷房這終們己數後進，得水青血，親人明角以了……願所子，我計關；病石以！角法大在你名為統率區朋的我大後子成馬式畫工一客：超空差，識不上作能來書中鄉面小些得示理可國方曾：自事跟斷我生關造。',
      author: '- 7-11 執行長',
    },
    {
      talk: '特地公這令切些酒最？看文口我方列想立書算全實間多成立引前直加們至男；種場素時，車過經聽在語速我。發小年面照一代國簡面用，之樣各風的。',
      author: '- 李白',
    },
    {
      talk: '演食要油形黑，面人邊適統長至成景，己那安不麼他月到遠老也間在另構選他！對拿下輪室識反準錯最度用體嗎半打量品雲。',
      author: '- 朱元璋',
    },
  ],
  imageList:
    [
      'dist/img/person.png',
      'dist/img/person.png',
      'dist/img/person.png',
    ],
};
$('.quote').whoSay(options);
```
### TODOs
- More themes
- RWD Supported

### License
MIT @ Hao-Wei Jeng
