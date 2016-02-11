angular.module('app.services',['ngCordova']); 

angular.module('configurations.service', [])
.factory('getCurrentSettings', function (){
    return {
        data: {
            autoRefreshLocation: false,
            username: null,
            getUsername: function(username){
                if (!username){
                    return "User " + Math.round(Math.random() * 1000);
                }
                
                return username;
                
            }
        }
    }
});
 
 
angular.module('app.services.Geolocation', ['configurations.service']) 
.factory('getCurrentPosition', function ($cordovaGeolocation, getCurrentSettings) {
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

          if (getCurrentSettings.data.autoRefreshLocation)
              {
                     var   watch = $cordovaGeolocation.watchPosition(watchOptions);
                      watch.then(
                        null,
                        function(err) {
                          // error
                        },
                        function(position) {
                            done(position);

                            if (!getCurrentSettings.data.autoRefreshLocation)
                                {
                                     watch.clearWatch();
                                }
                      });
              }
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


 