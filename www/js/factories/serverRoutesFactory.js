angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
    //change the routes once our server is deployed.
    // getPending: '/pending/getPending',
    // sendVote: '/pending/sendVote',
    // getResults: '/results/getResults',
    // getReceivers: '/receivers/getContacts',
    // postContent: '/receivers/sendContent',
    // checkUpdates: '/home/checkUpdates',
    // getUsername: '/home/getUsername',
    // checkFriendRequest: '/friends/checkRequest',
    // requestFriend: '/friends/requestFriend',
    // confirmFriend: '/friends/confirmFriend',
    // declineFriend: '/friends/declineFriend',
    // userLogin: '/user/login',
    // userSignup: '/user/signup',
    // userLogout: '/user/logout'


    getPending: 'http://votallyserve.azurewebsites.net/pending/getPending',
    sendVote: 'http://votallyserve.azurewebsites.net/pending/sendVote',
    getResults: 'http://votallyserve.azurewebsites.net/results/getResults',
    getReceivers: 'http://votallyserve.azurewebsites.net/receivers/getContacts',
    postContent: 'http://votallyserve.azurewebsites.net/receivers/sendContent',
    checkUpdates: 'http://votallyserve.azurewebsites.net/home/checkUpdates',
    getUsername: 'http://votallyserve.azurewebsites.net/home/getUsername',
    checkFriendRequest: 'http://votallyserve.azurewebsites.net/friends/checkRequest',
    requestFriend: 'http://votallyserve.azurewebsites.net/friends/requestFriend',
    confirmFriend: 'http://votallyserve.azurewebsites.net/friends/confirmFriend',
    declineFriend: 'http://votallyserve.azurewebsites.net/friends/declineFriend',
    userLogin: 'http://votallyserve.azurewebsites.net/user/login',
    userSignup: 'http://votallyserve.azurewebsites.net/user/signup',
    userLogout: 'http://votallyserve.azurewebsites.net/user/logout'

  };
});
