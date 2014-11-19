angular.module('App.ReceiversFactory', [])

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
    },
    //check the contents of homeContent
    getHomeContent: function(){
      return homeContent;
    }
  };
});