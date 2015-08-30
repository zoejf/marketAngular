angular.module('marketFinder', [])
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    var marketResults;
    var baseUrl = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/';

    //DEFINING FUNCTIONS 
    var searchByID = function (result, id) {
      //get details for the item with each id
      $http.get(baseUrl + 'mktDetail?id=' + id)
        .then(function (response) {
          console.log('http.get id: ', id)
          result.address = response.data.marketdetails.Address;
          result.google = response.data.marketdetails.GoogleLink;
          result.products = response.data.marketdetails.Products;
          var schedule = response.data.marketdetails.Schedule.replace(/(<br>)/g, '');
          console.log('schedule', schedule);
          result.schedule = schedule;
          console.log('final result w details', result);
        })
    }
    var loopThruID = function (marketResults) {
      console.log("zip results: ", marketResults);
      //loop through each item in marketResults array
      for (i = 0; i < marketResults.length; i ++) {
        console.log('pre http id', id);
        
        //define id and item for each of the objects in marketResults array
        var id = marketResults[i].id;
        var result = marketResults[i];

        //run searchByID function for each id in the zip results array
        searchByID(result, id);
      } 
      //after loop finishes, add temp marketResults array to $scope/view
      $scope.pageResults = marketResults; 
    };
    //END of defining functions

    //this runs when user clicks zipcode search
    $scope.searchZip = function () {
      $scope.pageResults = [];
      var zip = $scope.zip;
      console.log(zip);
      $http.get(baseUrl + 'zipSearch?zip=' + zip)
        .then(function (response) {
          console.log('zip results: ', response.data.results);
          marketResults = response.data.results; //array of objects {id: 1234, marketname: 'example'}
          loopThruID(marketResults); // function to re-search markets by id
        });
    }//end of searchZip function

  }]);
