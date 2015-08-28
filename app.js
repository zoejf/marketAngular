angular.module('marketFinder', [])
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.pageResults = [];
    var marketResults;
    var baseUrl = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/';
    var searchByID = function (marketResults) {
      console.log("zip results: ", marketResults);
      //loop through each item in marketResults array
      for (i = 0; i < marketResults.length; i ++) {
        //define id and item for each of the objects in marketResults array
        var id = marketResults[i].id;
        var result = marketResults[i];
        //get details for the item with each id
        if (id) {
          $http.get(baseUrl + 'mktDetail?id=' + id)
            .then(function (response) {
              result.address = response.data.marketdetails.Address;
              result.google = response.data.marketdetails.GoogleLink;
              result.products = response.data.marketdetails.Products;
              result.schedule = response.data.marketdetails.Schedule;
              console.log('final result w details', result);
              //after loop finishes, add temp marketResults array to $scope
              $scope.pageResults = marketResults;
            });
        }//end of if statement
      }
    };//end of searchByID function

    //this runs when user clicks zipcode search
    $scope.searchZip = function () {
      var zip = $scope.zip;
      console.log(zip);
      $http.get(baseUrl + 'zipSearch?zip=' + zip)
        .then(function (response) {
          console.log('zip results: ', response.data.results);
           marketResults = response.data.results; //array of objects {id: 1234, marketname: 'example'}
          searchByID(marketResults); // function to re-search markets by id
        });
    }//end of searchZip function

  }]);
