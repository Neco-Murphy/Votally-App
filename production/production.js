"use strict";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('App', [
  'ionic', 
  //Controllers
  'App.Home',
  // 'App.Loading',
  'App.Login',
  'App.Pending',
  'App.Receivers',
  'App.Results',
  'App.Settings',
  'App.Signup',
  //Factories
  'App.ServerRequests',
  'App.ServerRoutes',
  'App.Auth',
  'App.Camera',
  'App.Directives',
  'App.ReceiversFactory'
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
      if (toState.authenticate && !Auth.isAuth()){
        // User isn’t authenticated
        $state.transitionTo('tab.account');
        event.preventDefault(); 
      }
    });
})

.config(function($compileProvider, $stateProvider, $urlRouterProvider) {

  //Retrieves and overwrites the default regexp that is used to whitelist safe urls during img sanitization
  //Normalizes any url about to be used in img(src) and returns an absolute path
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in their respective Controller file in their view directory
  $stateProvider

    //TODO Do we need this block?

    // setup an abstract state for the tabs directive
    // .state('tab', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html',
    // })

    // Each tab has its own nav history stack:
    .state('home', {
      url: '/',
      views: {
        '': {
          templateUrl: 'js/views/home/homeTemplate.html',
          controller: 'HomeController'
        }
      },
      authenticate:true
    })

    .state('loading', {
      url: '/loading',
      views: {
        'view-loading': {
          templateUrl: 'js/views/loading/loadingTemplate.html',
          controller: 'LoadingController'
        }
      },
      authenticate:true
    })

    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: 'js/views/login/loginTemplate.html',
          controller: 'LoginController'
        }
      },
      // authenticate:true
    })

    .state('pending', {
      url: '/pending',
      views: {
        '': {
          templateUrl: 'js/views/pending/pendingTemplate.html',
          controller: 'PendingController'
        }
      },
      // authenticate:true
    })

    .state('receivers', {
      url: '/receivers',
      views: {
        '': {
          templateUrl: 'js/views/receivers/receiversTemplate.html',
          controller: 'ReceiversController'
        }
      },
      authenticate:true
    })
    
    .state('results', {
      url: '/results',
      views: {
        '': {
          templateUrl: 'js/views/results/resultsTemplate.html',
          controller: 'ResultsController'
        }
      },
      // authenticate:true
    })

    .state('settings', {
      url: '/settings',
      views: {
        '': {
          templateUrl: 'js/views/settings/settingsTemplate.html',
          controller: 'SettingsController'
        }
      },
      // authenticate:true
    })

    .state('signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: 'js/views/signup/signupTemplate.html',
          controller: 'SignupController'
        }
      },
      // authenticate:true
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});


;angular.module('App.Directives', [])
  .directive('setImage', function(){
    return {
      restrict: 'A',
      scope: {
        image: '='
      },
      link: function(scope, element, attributes){
        scope.$watch('image', function(newVal, oldVal){
          element.attr("src", scope.image);
        })
      }
    }
  })

  .directive('compareInput', function(){
    return {
      require: 'ngModel',
      scope: {
        otherModelValue : '=compareInput'
      },
      link: function(scope, element, attributes, ngModel){
        ngModel.$validators.compareInput = function(modelValue){
          return modelValue == scope.otherModelValue;    
        }
        scope.$watch('otherModelValue', function(){
          ngModel.$validate();
        })
      }
    }
  });
;angular.module('App.Auth', [])

.factory('Auth', function ($http, $location, $window) {

  //===================HELPER FUNCTION========================

  var auth = function(userInfo, route){
    return $http({
      method: 'POST',
      url: route,
      data: userInfo
    })
    .then(function (response) {
      return response.data;
    })
    //if error in the process, console it 
    .catch(function(error){
      console.error(error);
    });
  };
  
  //===================SERVICE FUNCTION========================
  var login = function (username, password) {
    var userInfo = {
      username: username,
      password: password
    };
    //change the routes once our server is deployed.
    return auth(userInfo, '/user/login')
      .then(function(response){
        if(response.error){
          //if there is an error property in the response, return the error
          return response.error;
        }else{
          //if there is no error, store information in the local storage.
          $window.localStorage.setItem('loggedIn', true);
          $window.localStorage.setItem('userId', response.userId); 
          $window.localStorage.setItem('token', response.token);
        }
      })
      .catch(function(error){
        console.log(error);
      });
  };

  var signup = function (username, password, email) {
    var userInfo = {
      username: username,
      password: password,
      email: email
    };
    //change the routes once our server is deployed.
    return auth(userInfo, '/user/signup')
      .then(function(response){
        //if there is an error property in the response, return the error
        if(response.error){
          return response.error;
        }else{
          //if there is no error, store information in the local storage.
          $window.localStorage.setItem('loggedIn', true);
          $window.localStorage.setItem('userId', response.userId); 
          $window.localStorage.setItem('token', response.token);
        }
      })
      .catch(function(error){
        console.log(error);
      });
  };

  var loggedIn = function () {
    return !!$window.localStorage.getItem('loggedIn');
  };

  var logout = function (userId) {
    //Auth sends an http request to the database
    auth({userId: userId}, '/user/logout').then(function(){
    //When logout button is clicked, set local storage object to be loggedIn = false and userId = undefined 
      $window.localStorage.setItem('loggedIn', false);
      $window.localStorage.setItem('userId', undefined);
      $window.localStorage.setItem('token', undefined);
      $location.path('/login');
    }).catch(function(error){
      console.log('Unable to logout: ', error)
    });
  };

  return {
    login: login,
    signup: signup,
    loggedIn: loggedIn,
    logout: logout
  };
});
;angular.module('App.Camera', [])

.factory('Camera', function ($q) {

  var takePicture = {
    quality: 100,
    saveToPhotoAlbum: false,
    destinationType: 0
  };

  var uploadPicture = {
    quality: 100,
    saveToPhotoAlbum: false,
    destinationType: 0,
    sourceType: 0
  };

  var cameraOptions = function(value) {
  	if (value === 'takePicture') {
    		return takePicture;
    } else if (value === 'uploadPicture') {
    		return uploadPicture;
    }
  };

  return {
    getPicture: function(option) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, cameraOptions(option)
      );
      return q.promise;
    }
  };

});
;angular.module('App.ReceiversFactory', [])

.factory('ReceiversFactory', function(){
  //stores the content from the home send button
  var homeContent = {};

  var sendContent = {};

  return {
    //saves the content when send button on home page is pressed
    contentFromHome: function(content){
      homeContent = content;
    },
    //add an array of receivers to the sendContent object
    addReceivers: function(receivers){
      sendContent.receivers = receivers;
      sendContent.content = homeContent;
      return sendContent;
    },
    //resets homeContent to be empty object
    resetContentFromHome: function(){
      homeContent = {};
    }
  };
});;angular.module('App.ServerRequests', [])

.factory('ServerRequests', function ($http) {
  //make get request to the route
  var get = function (route) {
    return $http({
      method: 'GET',
      url: route
    })
    .then(function (response) {
      return response.data;
    });
  };

  //make post request to the route with given data
  var post = function (data, route) {
    return $http({
      method: 'POST',
      url: route,
      data: data
    })
    .then(function (response) {
      return response.data;
    });
  };

  return {
    get: get,
    post: post
  };
});
;angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
  	//change the routes once our server is deployed.
    sendContent: '/receivers/sendContent',
    getPending: '/pending/getPending',
    sendVote: '/pending/sendVote',
    getResults: '/results/getResults',
    getReceivers: '/receivers/getContacts',
    postContent: '/receivers/sendContent'
  };
});
;angular.module('App.Home', [])

//Retrieves and overwrites the default regexp that is used to whitelist safe urls during img sanitization
//Normalizes any url about to be used in img(src) and returns an absolute path
.config(function($compileProvider) {
  $compileProvider
    .imgSrcSanitizationWhitelist(/^\s*(https?|blob|cdvfile|content|ftp|mailto|file|tel):|data:image\//);
})

.controller('HomeController', function($scope, $location, $window, ReceiversFactory, Auth, Camera) {
  //TODO Check if logged in and route accordingly

  //Holds the pic/text content that will be sent
  $scope.content = {
    topic: '',
    picture: '',
    userId: 0
  }

  //sends to new routes when home page is swiped
  $scope.swiping = function(direction){
    if (direction === 'left'){
      $location.path('/results');
    }
    if (direction === 'right'){
      $location.path('/pending');
    }
  }

  //sends to receivers when Send button is pushed
  $scope.send = function(){
    //if there is no picture and no message, do nothing
    if ($scope.content.topic === '' && $scope.content.picture  === ''){
      return;
    }
    else {
      //sends content to be stored in ReceiversFactory
      ReceiversFactory.contentFromHome($scope.content);
      //sends user to receiver route
      $location.path('/receivers');
    }
  }

  //dynamically updates the content object's topic property as text is changed
  $scope.addText = function(newText){
    $scope.content.topic = newText;
  }

  //calls the getPicture function from the factory allowing the user to upload/take pictures
  $scope.getPhoto = function(option) {
    Camera.getPicture(option)
      .then(function(imageData) {
        $scope.content.picture = "data:image/jpeg;base64," + imageData;
        document.getElementById('myImage').src = $scope.content.picture;
      }, function(error) {
        alert(error); 
      }, option);
  }
});

;;angular.module('App.Login', [])
	.controller('LoginController', function ($scope, $window, $location, Auth) {
		$scope.usernameInput;
		$scope.passwordInput;
		$scope.showLoginError = false;

		$scope.logIn = function(username, password){
			Auth.login(username, password)
			  .then(function(error){
			  	if(error){
				  	//if there is an error message from the server, show it to the user
			  		$scope.showLoginError = true;
			  		$scope.loginError = error;
			  	}else{
				  	//if there is no error, route to home
						console.log('login as ', username, password);
	          $location.path('/');
			  	}
			  });
		};

		$scope.signUp = function(){
			$location.path('/signup');
		};
			
	});;angular.module('App.Pending', [])
.controller('PendingController', function ($scope, $window, $location, ServerRequests, ServerRoutes, Auth) {
  
  //======================== helper functions ==============================

  var showContent = function(currentContent){
    console.log('setting up to show the content ...');
    contentId = currentContent.contentId;
    $scope.topic = currentContent.topic;
    $scope.sender = currentContent.username;
    $scope.pictureUrl = currentContent.data;
  };

  var checkPending = function(){
    //if there are no pending, redirect back to home
    if(!pendingList || pendingList.length === 0){
      //redirect to home
      $location.path('/');
    }else{
      //show the 1st pending item
      showContent(pendingList[0]);
    }
  }

  //======================== initialize ==============================

  // //if not loggedIn, send the user to logIn
  // if(!Auth.loggedIn()){
  //  $location.path('/logIn');
  // }
  var contentId;
  var pendingList;
  //get the userId info from local storage and set it as a local variable
  var userId = $window.localStorage.getItem('userId');

  //get all the pendings for the user
  var getPending = function(){
    ServerRequests.post({ userId: userId }, ServerRoutes.getPending)
      .then(function(response){
        //  response looks like...
        // {
        //  pendingContents: [{
        //    contentId: number,
        //    topic: string,
        //    picture: undefined(url?)
        //    userId: number,
        //    userName: string
        //  }, {}, ...]
        // } 
        pendingList = response.contents;
        checkPending();
      })
      //if there is an error getting the pendings, console an error.
      .catch(function(error){
        console.error(error);
      });
    
  };
  getPending();

  //======================== click function ==============================

  $scope.sendVote = function(vote){
    var result = {
      'userId': userId,
      'contentId': contentId,
      'vote': vote
    };

    ServerRequests.post(result, ServerRoutes.sendVote)
      .then(function(){
        pendingList.shift();
        checkPending();
      })
      //if there is an error on voting, console an error.
      .catch(function(error){
        console.error(error);
      });
  };

});

//======================= fake data ============================
//    pendingList = [
//      { contentId: 1,
//        topic: 'This owl beanie for Rich?',
//        picture: 'http://assets.inhabitots.com/wp-content/uploads/2013/11/adorable-cozy-owl-hat-537x365.jpg',
//        userId: 100,
//        userName: 'Teresa' },
//      { contentId: 2,
//        topic: 'for lunch?',
//        picture: 'http://www.scmp.com/sites/default/files/styles/980w/public/2013/07/31/turtle-burger-l.jpg?itok=SfyO-6l_',
//        userId: 200,
//        userName: 'Bace' },
//      { contentId: 3,
//        topic: 'still grumpy?',
//        picture: 'http://i.imgur.com/Cxagv.jpg',
//        userId: 300,
//        userName: 'Rich' },
//      { contentId: 4,
//        topic: 'wanna play?',
//        picture: 'http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png',
//        userId: 400,
//        userName: 'Satoko' },
//      { contentId: 5,
//        topic: 'mall?',
//        picture: 'http://www.thespicehut.com/Assets/bubble-tea-bellingham.jpg',
//        userId: 400,
//        userName: 'Satoko' }
//    ];
;'use strict';

describe('PendingController', function(){

	it('Module should exist', function() {
	    expect(true).toBe(true)
	});
  
  //======================== PREPARATION ==============================

	var $scope, $rootScope, /* $httpBackend, */ServerRequests, ServerRoutes, spyEvent;

	beforeEach(module('App'));
	beforeEach(inject(function($injector) {

	  // mock out our dependencies
	  $rootScope = $injector.get('$rootScope');
	  $httpBackend = $injector.get('$httpBackend');
	  ServerRequests = $injector.get('ServerRequests');
	  ServerRoutes = $injector.get('ServerRoutes');
	  $scope = $rootScope.$new();

	  var $controller = $injector.get('$controller');

	  var methods = {
	  	getPending: function(argument){ return argument },
	  	sendVote: function(argument){ return argument }
	  };

	  createController = function () {
	    return $controller('PendingController', {
	      $scope: $scope,
	      ServerRequests: ServerRequests,
	      ServerRoutes: ServerRoutes
	    });
	  };
    createController();
	}));

  //======================== TESTS ==============================
//test
//does it make a post request to get the pending list?
//does it send a post request with the correct vote infomation?
//does it redirect to the home if there is no more pendings?
  var mockPendingResponse = {
  	pendingContents: [
	  	   	{ contentId: 1,
	  	   	  topic: 'This owl beanie for Rich?',
	  	   	  picture: 'owl-beanie',
	  	   	  userId: 100,
	  	   	  userName: 'Teresa' },
	  	   	{ contentId: 2,
	  	   	  topic: 'for lunch?',
	  	   	  picture: 'turtle-burger',
	  	   	  userId: 200,
	  	   	  userName: 'Bace' },
	  	   	{ contentId: 3,
	  	   	  topic: 'still grumpy?',
	  	   	  picture: 'http://i.imgur.com/Cxagv.jpg',
	  	   	  userId: 300,
	  	   	  userName: 'Rich' }
	  	   ]
  };
  
  it('should call checkPending() when controller is loaded', function () {
    $httpBackend.expectPOST('someRoute').respond(mockPendingResponse);
    $httpBackend.flush();
    expect($scope.pendingList).to.eql(mockPendingResponse.pendingContents);
  });

  it('should have a sendVote method on the $scope', function() {
    expect($scope.sendVote).to.be.a('function');
  });
  
  // it('should call sendVote with 1, when yes button is clicked', function() {
  // 	spyEvent = spyOnEvent('.vote-yes', 'click');
  //   $('.vote-yes').trigger( "click" );
       
  //   expect('click').toHaveBeenTriggeredOn('.vote-yes');
  //   expect(spyEvent).toHaveBeenTriggered();

  //   $('.vote-yes').trigger( "click" );
  //   expect(methods.sendVote).toHaveBeenCalledWith(1);
  // });

  // it('should call sendVote with -1, when no button is clicked', function() {
  //   $('.vote-no').trigger( "click" );
  //   expect(methods.sendVote).toHaveBeenCalledWith(0);
  // });

  // it('should have the pendingList shifted after sendingVote', function() {
  //   var before = $scope.pendingList.length;
  //   $('.vote-yes').trigger( "click" );
  //   expect($scope.pendingList.length - before)to.Equal(1);
  // });

  // it('should have the next content after shifting pendingList', function() {
  // 	$scope.pendingList = mockPendingResponse.pendingContents;
  // 	expect($scope.sender).toBe('Teresa');
  // 	expect($scope.topic).toBe('This owl beanie for Rich?');
  // 	expect($scope.topicUrl).toBe('owl-beanie');
  // 	$('.vote-yes').trigger( "click" );
  // 	expect($scope.sender).toBe('Bace');
  // 	expect($scope.topic).toBe('for lunch?');
  // 	expect($scope.topicUrl).toBe(false);
  // });

  // it('should route to home when there is no more pending', function() {
  // });
});
;angular.module('App.Receivers', [])

.controller('ReceiversController', function($scope, $location, ReceiversFactory, ServerRequests, ServerRoutes) {

  //delete this part when server working
  var tempReceivers = [
      {name: 'Teresa', userId: 12345},
      {name: 'Satoko', userId: 67894},
      {name: 'Rich', userId: 23456},
      {name: 'bace', userId: 24689},
      {name: 'Bogut', userId: 54711},
    ];

  $scope.cancelSend = function(){
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    $location.path('/'); 
  }

  //when send button is clicked on receivers page,
  //send current selected receivers (as an array) to Receivers Factory
  $scope.setReceivers = function(){
    //move selectedReceivers from view format to model format
    for (var key in $scope.viewSelectedReceivers) {
      $scope.modelSelectedReceivers.push(key);
    }
    //send receivers to ReceiversFactory, get back content & receivers in object
    var sendContent = ReceiversFactory.addReceivers($scope.modelSelectedReceivers);

    //make post request with content and receivers object
    ServerRequests.post(sendContent, ServerRoutes.postContent);
    
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    
    //route back to the home page
    $location.path('/'); 
  };

  //all receivers to be listed in the receivers page
  $scope.allReceivers = tempReceivers;
  //$scope.allReceivers = serverRequestFactory.get(serverRoutesFactory.getReceivers);

  //an array to send to the server in the content object
  $scope.modelSelectedReceivers = [];
    
  //a place to store a list of receivers that have been selected in the view
  $scope.viewSelectedReceivers = {};

  //pushes a receiver object to the selectedReceivers array when the receiver is clicked
  $scope.select = function(receiver){
    if ($scope.viewSelectedReceivers[receiver.userId]){
      delete $scope.viewSelectedReceivers[receiver.userId];
    } else {
      $scope.viewSelectedReceivers[receiver.userId] = receiver.name;
    }
  }

  //determines if specific receiver is selected (for visual representation in view)
  $scope.isSelected = function(receiver){
    return !!$scope.viewSelectedReceivers[receiver.userId];
  }
  
});;'use strict';

angular.module('App.Results', [])

//when minify to deploy, want to write controller with [] syntax to "protect" them
.controller('ResultsController', function($scope, $window, $location, Auth, ServerRequests, ServerRoutes){ //Auth, ServerRequests, ServerRoutes are factories
  console.log("are you in controller?");

  var userId = $window.localStorage.getItem('userId');
  if(!Auth.loggedIn()){ // checks if the user is loggedIn
    //Call a post request with the userId to the server to get a list of results with that userId 
    //results are obtained before continuing
    ServerRequests.post({userId: userId}, ServerRoutes.getResults).then(function(response){
      //Expect the ServerRequest to output an array of contents

       //the for loop is to make it so that the recent items are displayed first
      $scope.results = [];
      for(var recent = response.length - 1; recent >= 0 ; recent--){
        $scope.results.push(response[recent]);
      }
    })
  } else {
    //user is not logged in
    //route to login page
    $location.path('/login')
  }

///========= Testing the html ===============///

  // var results = [{topic: "prom dress", picture: 'http://s3.weddbook.com/t4/1/9/8/1981083/emerald-strapless-beaded-criss-cross-long-prom-dress.jpg', userId: 1, userName: 'treelala', yes: 4, no: 1}, {topic: "dinner", picture: 'http://www.ivstatic.com/files/et/imagecache/636/files/slides/0413.jpg', userId: 2, userName: 'satoko', yes: 5, no: 0}, {topic: "bubble tea?", picture: "http://upload.wikimedia.org/wikipedia/commons/a/a2/Bubble_Tea.png", userId: 3, userName: 'bace', yes: 600, no: 0}, {topic: "hot or not?", picture: 'http://o0tp7mzzn32msux2jkg8kga0.wpengine.netdna-cdn.com/images/old/6a017c3697a248970b01a3fccf4b2e970b-250wi.png', userId: 1, userName: 'rich', yes: 4, no: 1}]
  
  // $scope.results = results;
  // console.table($scope.results, "scope results")

  $scope.routeToHome = function(){
    console.log("are you at home")
    $location.path('/')
  }
  $scope.routeToSettings = function(){
    $location.path('/settings')
  }
})





;// describe('Controller should exist', function() {
//   //Load the module with ResultsController
//   beforeEach(module('App.Results'));

//   var controller, scope, location, auth, serverRequests, serverRoutes;
//   //inject the $controller and $rootScope services in eacj beforeEach block
//   beforeEach(inject(function ($controller, $rootScope){
//     //Create a new scope that's a child of the $rootScope
//     scope = $rootScope.$new();
//     //Create the controller
//     controller = $controller('ResultsController', {
//       $scope: scope
//     });

//     //** now we have access to both the controller as well as the scope of the ResultsController
//   }));

//   //Results should have these properties to reference
//   it('Results should be an object with properties', function() {
//     expect(scope.results).toEqual(jasmine.any(Array))
//     expect(scope.results[0].topic).toEqual(jasmine.any(String));
//     expect(scope.results[0].picture).toBeDefined();
//     expect(scope.results[0].userId).toEqual(jasmine.any(Number));
//     expect(scope.results[0].userName).toEqual(jasmine.any(String));
//     expect(scope.results[0].yes).toEqual(jasmine.any(Number));
//     expect(scope.results[0].no).toEqual(jasmine.any(Number));
//   })

//   //Route to Home
//   it('routeToHome should be a function', function(){
//     expect(scope.routeToHome).toEqual(jasmine.any(Function))
//   });

//   //Route to Settings
//   it('routeToSettings should be a function', function(){
//     expect(scope.routeToSettings).toEqual(jasmine.any(Function))
//   })

//   // it('Controller should exist', function() {
//   //     expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
//   // });

// });

// // describe('Should check for authentication', function() {

// //   it('Should check if user is logged in', function() {
// //       expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
// //   });

// //   it('Controller should exist', function() {
// //       expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
// //   });
// // });

// // describe('Can retrieve data', function() {

// //   it('Data is received', function() {
// //       expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
// //   });

// //   it('Data should be in the right order', function() {
// //       expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
// //   });
// // });

// //write fake injections for $scope, $window, $location, Auth, ServerRequests, ServerRoutes
;'use strict';

angular.module('App.Settings', [])

.controller('SettingsController', function($scope, $window, $location, Auth, ServerRequests, ServerRoutes){ //Auth, ServerRequests, ServerRoutes are factories
  var userId = $window.localStorage.getItem('userId');

  if(Auth.loggedIn()){ // checks if the user is loggedIn, should be Auth.loggedIn() without !, put it there for testing without auth set up
    //Logout function - activates when Logout is clicked in SettingsView, redirects to login after
    $scope.logout = function(){
      //Auth.logout sends an http request to the server to remove the token from the database and resets the local storage
      Auth.logout(userId);
    };
    //Route to Results when the "back" button is clicked on the nav bar
    $scope.routeToResults = function(){
      $location.path('/results')
    }
  } else {
    //If not logged in, routes to login automatically
      $location.path('/login')
  };
})


///========= Testing the html ===============///

// Expect local storage to be equal to {loggedIn: true,
// userId: 1234, token: some string} 




;;angular.module('App.Signup', [])
  .controller('SignupController', function ($scope, $window, $location, Auth){
  	$scope.usernameInput;
  	$scope.passwordInput;
    $scope.emailInput;
    $scope.showSignupError = false;
    $scope.signupError;

  	$scope.signUp = function (username, password, email) {
  		Auth.signup(username, password, email)
  		.then(function (error){
        //if there is a error message from the server, show it to the user
        if(error){
          $scope.showSignupError = true;
          $scope.signupError = error;
        }else{
          //if there is no error, route to home
    			console.log('siginup and login as', username, password);
    			$location.path('/');
        }
  		})
  	};

  });