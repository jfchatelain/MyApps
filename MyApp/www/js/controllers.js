 

var myWeather = function (myScope, getCurrentPosition,getWeather) { 
      getCurrentPosition(function (position) {
            getWeather(
               position
               , function (data, position) {
                   console.log(data);
                   myScope.City = data.name;
                   myScope.Country = data.sys.country;
                   myScope.Description = data.weather[0].description;
                   myScope.IconId = data.weather[0].icon;
                   myScope.Temperature = data.main.temp;
                   myScope.Time = Date.now();
                   myScope.WindSpeed = data.wind.speed;    
                   console.log('Weather retreived') 
               }); 
        });
} 

var map = null;
var accuracyShape = null;
var marker = null;
var markers =  new L.LayerGroup();

var locateMe = function(myScope, getCurrentPosition){
      getCurrentPosition(function (position) { 
          
        var lat =  position.coords.latitude;
        var lng =  position.coords.longitude;
        var accuracy =   position.coords.accuracy;
          
          if (!map)
              {              
                   // set map here
                   map = L.map('map');
                   map.setView([lat, lng], 13);
                   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                       maxZoom: 18
                   }).addTo(map); 
                    markers.addTo(map);
                    marker = L.marker([lat, lng]);
                   marker.addTo(markers).bindPopup("You are here!").openPopup();                 
                   accuracyShape = L.circle([lat, lng], accuracy);
                   accuracyShape.addTo(markers);
              } 
          else{
              console.log('clearing layers');
              markers.clearLayers();
                 var newLatLng = new L.LatLng(lat, lng);
                marker.setLatLng(newLatLng);
               accuracyShape = L.circle([lat, lng], accuracy);
                   accuracyShape.addTo(markers);
              marker.addTo(markers);
               map.panTo(newLatLng, 13);
          }
          
    }); 
}

angular.module('app.controllers', [])
.controller('weatherCtrl', [ '$scope', 'getCurrentPosition', 'getWeather', function($scope, getCurrentPosition, getWeather) {
    myWeather($scope, getCurrentPosition, getWeather);
     $scope.refresh =   function() { myWeather($scope, getCurrentPosition,getWeather);} ;
}])
   
.controller('myLocationCtrl',   function($scope, getCurrentPosition) {    
  locateMe($scope, getCurrentPosition);
//     $scope.refresh = function() {locateMe($scope, getCurrentPosition);};
})
   
.controller('myChannelCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {
    // $scope.username = 'test';
})
   
.controller('signupCtrl', function($scope) {

})//

.controller('myConfigCtrl', function($scope) {

})//

 