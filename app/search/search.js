'use strict';

angular.module('search', [])

.controller('SearchCtrl', ['$scope', '$firebase', '$http', function($scope, $firebase, $http){

    $http.get('app/search/icons.json')
    .then(function(res){
        var filtered = [];
        angular.forEach(res.data.icons, function(item) {
            filtered.push(item);
        });
       $scope.icons = filtered;
    });

    $scope.searchText = '';
    $scope.selectedIcons = [];

    // var iconsRef = $firebase(new Firebase('https://icons.firebaseio.com/'));
    // $scope.icons = iconsRef.$child('icons');

    $scope.addToTray = function(obj){
        var newObj = {
            href: obj.href,
            filename: obj.filename
        }
        $scope.selectedIcons.push(newObj);
    }

    $scope.clear = function(){
        $scope.selectedIcons = [];
    }

}])
