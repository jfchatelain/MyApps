 

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

angular.module('app.controllers', [])
.controller('weatherCtrl', [ '$scope', 'getCurrentPosition', 'getWeather', function($scope, getCurrentPosition, getWeather) {
    myWeather($scope, getCurrentPosition, getWeather);
     $scope.refresh =   function() { myWeather($scope, getCurrentPosition,getWeather);} ;
}])
   
.controller('myLocationCtrl',   function($scope, getCurrentPosition) {    
    getCurrentPosition(function (position) {
           
            var lat =  position.coords.latitude;
           var lng =  position.coords.longitude;
            var accuracy =   position.coords.accuracy;

           // set map here
           var map = L.map('map').setView([lat, lng], 13);
           L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
               maxZoom: 18
           }).addTo(map);

           L.marker([lat, lng]).addTo(map).bindPopup("You are here!").openPopup();
           L.circle([lat, lng], accuracy).addTo(map);
     
    
    }); 
})
   
.controller('myChannelCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {
    // $scope.username = 'test';
})
   
.controller('signupCtrl', function($scope) {

})//

 