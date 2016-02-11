angular.module('app.services',['ngCordova']); 
 
 
angular.module('app.services.Geolocation', []) 
.factory('getCurrentPosition', function ($cordovaGeolocation) {
    return function (done) { 
        
        
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
               done(position);
            }, function(err) {
              throw new Error('Unable to retreive position');
            });
        
       

  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
     done(position);
  });
        
          
    };
 
});
//
angular.module('app.services.Forecast', [])
.factory('getWeather', function ($http) {
    
    
    return function (position, done) {
         console.log('In weather function');
        $http({ method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + "&appid=44db6a862fba0b067b1930da0d769e98&units=metric" })
            .success(function (data, status, headers, config) {
                done(data, position);
            })
            .error(function (data, status, headers, config) {
                throw new Error('Unable to get weather');
            });
    };
});

 