angular.module('marketFinder', [])
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searchZip = function () {
      var zip = $scope.zip;
      console.log(zip);
    }

  }]);