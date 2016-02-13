// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives','app.services.Forecast', 'app.services.Geolocation','configurations.service', 'pubnub.angular.service' ])

.run(function($ionicPlatform,$cordovaLocalNotification) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
       $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);

          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Title here',
            text: 'Text here',
            at: _10SecondsFromNow
          }).then(function (result) {
            alert('test');
              console.log(result);
          });
    };
      
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); 
         
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    } 
      console.log(device.platform);
       if(device.platform === "ios") {
        window.plugin.notification.local.promptForPermission();
    }
      
  });
});
 