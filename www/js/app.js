'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('App', [
  'ionic', 
  //Controllers
  'App.AddFriends',
  'App.Friends',
  'App.Home',
  // 'App.Loading',
  'App.Login',
  'App.Pending',
  'App.Receivers',
  'App.Results',
  'App.Settings',
  'App.Signup',
  //Factories
  'App.AddFriendsFactory',
  'App.FriendsFactory',
  'App.ServerRequests',
  'App.ServerRoutes',
  'App.Auth',
  'App.HomeFactory',
  'App.Camera',
  'App.Directives',
  'App.ReceiversFactory',
  'App.PendingFactory'
])

.run(function($ionicPlatform, $rootScope, $state, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });

  //TODO! Change the state for unauthenticated users
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    //if the authenticate is set to true and the loggedIn status is false, route it cback to login view
    if(toState.authenticate && !(Auth.loggedIn() === 'true')){
      $state.transitionTo('login');
      event.preventDefault(); 
    }
  });
})

.config(function($compileProvider, $stateProvider, $urlRouterProvider) {

  //Retrieves and overwrites the default regexp that is used to whitelist safe urls during img sanitization
  //Normalizes any url about to be used in img(src) and returns an absolute path
  $compileProvider
    .imgSrcSanitizationWhitelist(/^\s*(https?|blob|cdvfile|content|ftp|mailto|file|tel):|data:image\//);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in their respective Controller file in their view directory
  $stateProvider

    // Each tab has its own nav history stack:
    .state('addFriends', {
      url: '/add-friends',
      views: {
        '': {
          templateUrl: 'www/js/views/addFriends/addFriendsTemplate.html',
          controller: 'AddFriendsController'
        }
      },
      authenticate: true
    })

    .state('friends', {
      url: '/friends',
      views: {
        '': {
          templateUrl: 'www/js/views/friends/friendsTemplate.html',
          controller: 'FriendsController'
        }
      },
      authenticate: true
    })

    .state('home', {
      url: '/',
      views: {
        '': {
          templateUrl: 'www/js/views/home/homeTemplate.html',
          controller: 'HomeController'
        }
      },
      authenticate: true
    })

    .state('loading', {
      url: '/loading',
      views: {
        'view-loading': {
          templateUrl: 'www/js/views/loading/loadingTemplate.html',
          controller: 'LoadingController'
        }
      },
      authenticate: false
    })

    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: 'www/js/views/login/loginTemplate.html',
          controller: 'LoginController'
        }
      },
      authenticate: false
    })

    .state('pending', {
      url: '/pending',
      views: {
        '': {
          templateUrl: 'www/js/views/pending/pendingTemplate.html',
          controller: 'PendingController'
        }
      },
      authenticate: true
    })

    .state('receivers', {
      url: '/receivers',
      views: {
        '': {
          templateUrl: 'www/js/views/receivers/receiversTemplate.html',
          controller: 'ReceiversController'
        }
      },
      authenticate: true
    })
    
    .state('results', {
      url: '/results',
      views: {
        '': {
          templateUrl: 'www/js/views/results/resultsTemplate.html',
          controller: 'ResultsController'
        }
      },
      authenticate: true
    })

    .state('settings', {
      url: '/settings',
      views: {
        '': {
          templateUrl: 'www/js/views/settings/settingsTemplate.html',
          controller: 'SettingsController'
        }
      },
      authenticate: true
    })

    .state('signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: 'www/js/views/signup/signupTemplate.html',
          controller: 'SignupController'
        }
      },
      authenticate: false
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});


