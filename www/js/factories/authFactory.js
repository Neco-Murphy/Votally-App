angular.module('App.Auth', [])

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
      console.log(error);
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
    return $window.localStorage.getItem('loggedIn');
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
