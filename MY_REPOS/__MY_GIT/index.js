const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
require('pug');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(() => {
  console.log(port, 'Listening on port', port)
})