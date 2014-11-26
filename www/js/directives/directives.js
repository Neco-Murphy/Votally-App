angular.module('App.Directives', [])
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

  .directive('compareInput', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      scope: {
        matchTarget: '=',
      },
      require: 'ngModel',
      link: function link(scope, element, attributes, control) {
        var validator = function (value) {
          control.$setValidity('match', value === scope.matchTarget);
          return value;
        };
   
        control.$parsers.unshift(validator);
        control.$formatters.push(validator);
        
        // This is to force validator when the original password gets changed
        scope.$watch('matchTarget', function(newVal, oldVal) {
          validator(control.$viewValue);
        });

      }
    };
  }]);
