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

angular.module('app.controllers',  [])
.controller('weatherCtrl', [ '$scope', 'getCurrentPosition', 'getWeather', function($scope, getCurrentPosition, getWeather) {
    myWeather($scope, getCurrentPosition, getWeather);
     $scope.refresh =   function() { myWeather($scope, getCurrentPosition,getWeather);} ;
}])
   
.controller('myLocationCtrl',   function($scope, getCurrentPosition) {    
  locateMe($scope, getCurrentPosition);
//     $scope.refresh = function() {locateMe($scope, getCurrentPosition);};
})
   
.controller('myChannelCtrl',  function($rootScope, $scope, $location, $cordovaLocalNotification, PubNub, getCurrentSettings) { 
    
   
     // make up a user id (you probably already have this)
      getCurrentSettings.data.username =  getCurrentSettings.data.getUsername(getCurrentSettings.data.username);
      $scope.userId   = getCurrentSettings.data.username;
      // make up a channel name
      $scope.channel  = 'Channel-s6n602zsa';
      // pre-populate any existing messages (just an AngularJS scope object)
      $scope.messages = ['Welcome to our private chat room']; 
    
    try
    {
        if (!$rootScope.initialized) {
            // Initialize the PubNub service
            PubNub.init({
             publish_key: 'pub-c-a2f0b1a5-de0a-4bab-9c1c-711a74a9e66f',
             subscribe_key: 'sub-c-645b81cc-cfa4-11e5-b684-02ee2ddab7fe',
              uuid:$scope.userId
            });
            $rootScope.initialized = true;
          }
    }
    catch(e)
        {
            console.log(e);
        }
    
 
    
      // Subscribe to the Channel
  PubNub.ngSubscribe({ channel: $scope.channel });
    
  $scope.publish = function(msg) {
    PubNub.ngPublish({
        
      channel: $scope.channel,
      message: "[" + $scope.userId + "] " + msg
    });
    $scope.myMessage = '';
  };
    
  // Register for message events
  $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
    $scope.$apply(function() {
        $scope.messages.push(payload.message); 
        
        try
            {
                  $cordovaLocalNotification.add({ message: "You got a new message "});
            }
                          
        catch(e)
            {
                console.log("Error: " + e)
            }
      
        
        
        
    });
  });
    
    
  // Register for presence events (optional)
  $rootScope.$on(PubNub.ngPrsEv($scope.channel), function(ngEvent, payload) {
    $scope.$apply(function() {
      $scope.users = PubNub.ngListPresence($scope.channel);
    });
  });
    
  // Pre-Populate the user list (optional)
  PubNub.ngHereNow({
    channel: $scope.channel
  });
  
  // Populate message history (optional)
  PubNub.ngHistory({
    channel: $scope.channel,
    count: 500
  });
    
    
    
})
   
.controller('loginCtrl', function($scope, getCurrentSettings, $cordovaFacebook) {
    
//     var appID = 4851672833;
//      var version = "v2.0"; // or leave blank and default is v2.0
//      $cordovaFacebookProvider.browserInit(appID, version);
    
    $scope.setUserName = function(username){
           getCurrentSettings.data.username = username;
    }
    
    $scope.facebookLogin = function()
    {
         $cordovaFacebook.login(["public_profile", "email", "user_friends"])
        .then(function(success) {
          // { id: "634565435",
          //   lastName: "bob"
          //   ...
          // }
        }, function (error) {
          // error
        });

    }
})
   
.controller('signupCtrl', function($scope) {

})// 

.controller('myConfigCtrl',  function($scope, getCurrentSettings, getCurrentPosition) {  
    
    $scope.onChange = function(checked)
    {
        getCurrentSettings.data.autoRefreshLocation = checked;
        if (checked)
        {
            locateMe($scope, getCurrentPosition);
        }
    }
   
})//

  
 