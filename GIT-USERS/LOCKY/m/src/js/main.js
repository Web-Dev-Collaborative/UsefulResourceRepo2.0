$(document).ready(function() {
  $('.main').fullpage({
    anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    menu: false,
    navigation: true,
    navigationTooltips: ['Home', 'About Me', 'Projects I involved', 'Contact'],
    autoScrolling: false,
  });
  $('#about-container').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',});
});
