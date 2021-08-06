var demo_location = [27.6750719,85.3140088];
var mymap = L.map('mapid').setView(demo_location, 16);
mymap.doubleClickZoom.disable(); 
// var mymap = L.map('mapid', {doubleClickZoom: false}).locate({setView: true, maxZoom: 16});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);

// Display popup for current Location
L.marker([27.67507,85.31400]).addTo(mymap)
.bindPopup("<b>Your Location</b>");

var popup = L.popup();

function onMapClick(e) {
popup
  .setLatLng(e.latlng)
  .setContent("You clicked the map at " + e.latlng.toString())
  .openOn(mymap);
}

mymap.on('click', onMapClick);