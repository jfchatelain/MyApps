angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.weather', {
      url: '/page1',
      views: {
        'side-menu21': {
          templateUrl: 'templates/weather.html',
          controller: 'weatherCtrl'
        }
      }
    })
        
      
    
      
        
    .state('menu.myLocation', {
      url: '/page2',
      views: {
        'side-menu21': {
          templateUrl: 'templates/myLocation.html',
          controller: 'myLocationCtrl'
        }
      }
    })
        
      
    
      
        
    .state('menu.myChannel', {
      url: '/page3',
      views: {
        'side-menu21': {
          templateUrl: 'templates/myChannel.html',
          controller: 'myChannelCtrl'
        }
      }
    })
        
   .state('menu.Config', {
      url: '/page5',
      views: {
        'side-menu21': {
          templateUrl: 'templates/config.html',
          controller: 'myConfigCtrl'
        }
      }
    })
        
      
    
      
        
    .state('login', {
      url: '/page4',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/page5',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page4');

});