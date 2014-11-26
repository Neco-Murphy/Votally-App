angular.module('App.Camera', [])

.factory('Camera', function ($q) {

  var takePicture = {
    quality: 50,
    saveToPhotoAlbum: false,
    destinationType: 0
  };

  var uploadPicture = {
    quality: 50,
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
