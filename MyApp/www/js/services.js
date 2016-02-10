angular.module('app.services',[]); 
 
//
angular.module('app.services.Cordova', [])
.factory('deviceReady', function () {
//    return function (done) {
//        if (typeof window.cordova === 'object') {
//            document.addEventListener('deviceready', function () { 
//                done();
//            }, false);
//        } else {
//            done();
//
//        }
//    };
});

angular.module('app.services.Geolocation', []) 
.factory('getCurrentPosition', function () {
    return function (done) { 
            navigator.geolocation.getCurrentPosition(function (position) {                 
                    done(position);
                
            }, function (error) {                
                    throw new Error('Unable to retreive position');
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

 