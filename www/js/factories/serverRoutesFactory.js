angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
    //change the routes once our server is deployed.
    getPending: 'http://votallyserve.azurewebsites.net/pending/getPending',
    sendVote: 'http://votallyserve.azurewebsites.net/pending/sendVote',
    getResults: 'http://votallyserve.azurewebsites.net/results/getResults',
    getReceivers: 'http://votallyserve.azurewebsites.net/receivers/getContacts',
    postContent: 'http://votallyserve.azurewebsites.net/receivers/sendContent',
    checkUpdates: 'http://votallyserve.azurewebsites.net/home/checkUpdates',
    checkFriendRequest: 'http://votallyserve.azurewebsites.net/friends/checkRequest',
    requestFriend: 'http://votallyserve.azurewebsites.net/friends/requestFriend',
    confirmFriend: 'http://votallyserve.azurewebsites.net/friends/confirmFriend',
    declineFriend: 'http://votallyserve.azurewebsites.net/friends/declineFriend',
    userLogin: 'http://votallyserve.azurewebsites.net/user/login',
    userSignup: 'http://votallyserve.azurewebsites.net/user/signup',
    userLogout: 'http://votallyserve.azurewebsites.net/user/logout'
  };
});
