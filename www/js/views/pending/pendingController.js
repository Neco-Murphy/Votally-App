angular.module('App.Pending', [])
.controller('PendingController', function ($scope, $window, $location, ServerRequests, ServerRoutes, PendingFactory, Auth) {
  
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

  var contentId;
  var pendingList;
  //get the userId info from local storage and set it as a local variable
  var userId = $window.localStorage.getItem('userId');

  //get all the pendings for the user
  PendingFactory.getPending(userId)
    .then(function(contents){
      //  contents looks like...
      //  [{
      //    contentId: number,
      //    topic: string,
      //    picture: undefined(url?)
      //    userId: number,
      //    userName: string
      //  }, {}, ...]
      pendingList = contents;
      checkPending();
    })
    //if there is an error getting the pendings, console an error.
    .catch(function(error){
      console.log(error);
    });

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
        console.log(error);
      });
  };

});

// ======================= fake data ============================
   pendingList = [
     { contentId: 1,
       topic: 'This owl beanie for Rich?',
       data: 'http://assets.inhabitots.com/wp-content/uploads/2013/11/adorable-cozy-owl-hat-537x365.jpg',
       userId: 100,
       username: 'Teresa' },
     { contentId: 2,
       topic: 'for lunch?',
       data: 'http://www.scmp.com/sites/default/files/styles/980w/public/2013/07/31/turtle-burger-l.jpg?itok=SfyO-6l_',
       userId: 200,
       username: 'Bace' },
     { contentId: 3,
       topic: 'still grumpy?',
       data: 'http://i.imgur.com/Cxagv.jpg',
       userId: 300,
       username: 'Rich' },
     { contentId: 4,
       topic: 'wanna play?',
       data: 'http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png',
       userId: 400,
       username: 'Satoko' },
     { contentId: 5,
       topic: 'mall?',
       data: 'http://www.thespicehut.com/Assets/bubble-tea-bellingham.jpg',
       userId: 400,
       username: 'Satoko' }
   ];
