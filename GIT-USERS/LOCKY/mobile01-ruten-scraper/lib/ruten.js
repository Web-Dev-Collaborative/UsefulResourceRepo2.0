var fs = require('fs');
var cheerio = require('cheerio');
var rutenHtml = require('./data/page').html;
var REGEX = /<a href="(.*?)".*?>(.*?)<\/a>/gi;
var CATE_NUM = 25;
var parseResult = {category: []};

$ = cheerio.load(rutenHtml, {decodeEntities: false});

for (var i = 1; i < CATE_NUM; ++i) {
  var category = $('.cat' + i + ' .sub').html();

  while (match = REGEX.exec(category)) {
    parseResult.category.push({url: match[1], title: match[2]});
  }

}

fs.writeFile('./output/category', JSON.stringify(parseResult, null, 2), 'utf8', function(err) {
  if (err) {
    console.error(new Error('Category file failed to be created.'));
  } else {
    console.log('Category file has been created successfully!');
  }
});
