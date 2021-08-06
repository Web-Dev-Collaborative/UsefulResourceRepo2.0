/*
    whoSay.js v 1.0.0
    Author: Hao-Wei Jeng
    Copyright (c) 2015 Hao-Wei Jeng, Released under the MIT license.
*/
;(function($, window, document, undefined) {
  $.fn.whoSay = function(options) {
    var $self = $(this),
      idx = 0,
      defaultOptions = {
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
      },

    options = options || defaultOptions;

    $('<div>', {
      class: 'quote-bubble',
      html: '<div class="quote-text"><span class="quote-talk"></span><br/><span class="quote-author"></span></div>',
    }).appendTo($self);

    $('<ul>', {
      class: 'usr-quotes-icon-list',
      html: generateImageList(options.imageList),
    }).appendTo($self);

    walkThroughTalk();

    function walkThroughTalk() {
      setQuote(idx);
      idx++;
      idx = idx % options.quoteList.length;
      setTimeout(function() {
        walkThroughTalk();
      }, options.timeOut);
    }

    function setQuote(idx) {
      var imgList = $('.usr-quotes-icon-list'),
        quoteList = options.quoteList;

      imgList.children().removeClass('active');
      imgList.children().eq(idx).toggleClass('active');

      $('.quote-talk').html(quoteList[idx].talk);
      $('.quote-author').html(quoteList[idx].author);
    }

    function generateImageList(list) {
      var html = '',
        i = 0,
        listLen = list.length;

      for (; i < listLen; ++i) {
        html += '<li><img src="' + list[i] + '"/></li>';
      }

      return html;
    }

    $('.usr-quotes-icon-list img').click(function() {
      var index = $('.usr-quotes-icon-list img').index(this);

      idx = index;
      setQuote(index);
    });

    function reportError() {
      // Implementing.
    }
  };
})(jQuery, window, document);
