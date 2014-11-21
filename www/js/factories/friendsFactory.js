angular.module('App.FriendsFactory', [])

.factory('FriendsFactory', function(){
  
  var Friends = [
    {userId: 123, username: 'Bryan'},
    {userId: 123, username: 'Bobby'},
    {userId: 123, username: 'Mike'},
    {userId: 123, username: 'Ralph'},
    {userId: 123, username: 'Rich'},
    {userId: 123, username: 'Ricky'},
    {userId: 123, username: 'Ronny'},
    {userId: 123, username: 'Satoko'},
    {userId: 123, username: 'Teresa'},
  ];


  return {
    tempFriends: Friends,

  };
});
