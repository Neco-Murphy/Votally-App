'use strict';

angular.module('App.Results', [])

.config(function ($compileProvider) {
  $compileProvider
    .imgSrcSanitizationWhitelist(/^\s*(https?|blob|cdvfile|content|ftp|mailto|file|tel):|data:image\//);
})

//when minify to deploy, want to write controller with [] syntax to "protect" them
.controller('ResultsController', function($scope, $window, $location, Auth, ServerRequests, ServerRoutes){ //Auth, ServerRequests, ServerRoutes are factories

  var classes = {
    0: 'resultsbar pct-0 inner',
    5: 'resultsbar pct-5 inner',
    10: 'resultsbar pct-10 inner',
    15: 'resultsbar pct-15 inner',
    20: 'resultsbar pct-20 inner',
    25: 'resultsbar pct-25 inner',
    30: 'resultsbar pct-30 inner',
    35: 'resultsbar pct-35 inner',
    40: 'resultsbar pct-40 inner',
    45: 'resultsbar pct-45 inner',
    50: 'resultsbar pct-50 inner',
    55: 'resultsbar pct-55 inner',
    60: 'resultsbar pct-60 inner',
    65: 'resultsbar pct-65 inner',
    70: 'resultsbar pct-70 inner',
    75: 'resultsbar pct-75 inner',
    80: 'resultsbar pct-80 inner',
    85: 'resultsbar pct-85 inner',
    90: 'resultsbar pct-90 inner',
    95: 'resultsbar pct-95 inner',
    100: 'resultsbar pct-100 inner'
  }

  var userId = $window.localStorage.getItem('userId');
  //Call a post request with the userId to the server to get a list of results with that userId 
  //results are obtained before continuing
  ServerRequests.post({ userId: userId }, ServerRoutes.getResults)
    .then(function(response){
      console.log(response.length);
    //Expect the ServerRequest to output an array of contents
    //the for loop is to make it so that the recent items are displayed first
      $scope.results = [];

      for(var recent = response.length - 1; recent >= 0 ; recent--){
        //set correct stamp
        if(response[recent].yes > response[recent].no){
          response[recent].stamp = './img/yesstamp.png'
        } else{
          response[recent].stamp = './img/nostamp.png'
        }

        var yesPercent =(response[recent].yes /(response[recent].yes + response[recent].no)) *100;
        var noPercent =(response[recent].no /(response[recent].yes + response[recent].no)) * 100;
        
        var yesPercentRounded = 5 * Math.round(yesPercent/5);
        var noPercentRounded = 5 * Math.round(noPercent/5);

        console.log(yesPercentRounded, noPercentRounded, "percentages")

        response[recent].yesbarclass = classes[yesPercentRounded];
        response[recent].nobarclass = classes[noPercentRounded];
        
        $scope.results.push(response[recent]);

      }
    })
    .catch(function(error){
      console.log(error);
    })

  $scope.routeToHome = function(){
    $location.path('/')
  }
  
  $scope.routeToSettings = function(){
    $location.path('/settings')
  }
})


///========= Testing the html ===============///

// var results = [{topic: "kitty", data: 'http://petlifepro.com/wp-content/uploads/2014/08/playful-kitten-6683.jpg', userId: 3, userName: 'treelala', yes: 4, no: 4, contentId: 100}, {topic: "akita", data: 'http://media-cache-ec0.pinimg.com/736x/b7/10/b4/b710b479efe2f9489eb08dadf53d8ff0.jpg', userId: 2, userName: 'satoko', yes: 5, no: 4, contentId: 101}, {topic: "alaskan malamute", data: "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Alaskan-Malamute-3.jpg", userId: 3, userName: 'bace', yes: 4, no: 1, contentId: 102}, {topic: "should i get this?", data: 'http://www.afunpictures.com/wp-content/uploads/2014/08/puppies-wallpaper-for-iphone-7-266x400.jpg', userId: 1, userName: 'rich', yes: 3, no: 2, contentId: 103}]
//     //the for loop is to make it so that the recent items are displayed first
//   $scope.results = [];
  
//   for(var recent = results.length - 1; recent >= 0 ; recent--){
//     //set correct stamp
//     if(results[recent].yes >= results[recent].no){
//       results[recent].stamp = '../../img/yesstamp.png'
//     } else{
//       results[recent].stamp = '../../img/nostamp.png'
//     }

//     var yesPercent =(results[recent].yes /(results[recent].yes + results[recent].no)) *100;
//     var noPercent =(results[recent].no /(results[recent].yes + results[recent].no)) * 100;
    
//     var yesPercentRounded = 5 * Math.round(yesPercent/5);
//     var noPercentRounded = 5 * Math.round(noPercent/5);

//     console.log(yesPercentRounded, noPercentRounded, "percentages")

//     results[recent].yesbarclass = classes[yesPercentRounded];
//     results[recent].nobarclass = classes[noPercentRounded];
    

//     $scope.results.push(results[recent]);

    //set correct bar for each result 


    
  //   console.log(results, "results")
  // }



