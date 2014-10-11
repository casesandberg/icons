'use strict';

angular.module('search', [])

.controller('SearchCtrl', ['$scope', '$firebase', '$window', '$http', function($scope, $firebase, $window, $http){

    $http.get('app/search/icons.json')
        .then(function(res){
            $scope.icons = res.data.icons;
        });

    $scope.searchText = '';

    // var iconsRef = $firebase(new Firebase('https://icons.firebaseio.com/'));
    // $scope.icons = iconsRef.$child('icons');
    //
    // $scope.icons.$on('loaded', function(){
    //
    //     angular.forEach($scope.icons, function(obj, index) {
    //         if($scope.icons[index].href){
    //             $scope.icons[index].filename = $scope.icons[index].href.replace(/[0-9]*-/, '').replace(/-/g, ' ').replace(/(@2x.svg)/, '')
    //         }
    //     });
    //
    // });

    $scope.addToTray = function(obj){
        var newObj = {
            href: obj.href,
            filename: obj.filename
        }
        $scope.selectedIcons.push(newObj);
    }

    $scope.selectedIcons = [];

    $scope.clear = function(){
        $scope.selectedIcons = [];
    }

}])

.filter('clean', function() {
    return function(items) {
    return items.replace(/[0-9]*-/, '').replace(/-/g, ' ').replace(/(@2x.svg)/, '');
    };
})

.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});

// .directive('walletSwitcher', ['$location', '$timeout', function($location, $timeout) {
//     return {
//         restrict:'A',
//         controller: 'WalletCtrl',
//         link: function(scope, element, attrs) {
//
//             scope.$watch('active', function(newV, oldV){
//
//                 if(scope.active == 'usd'){
//                     scope.total = '39.20';
//                     scope.symbol = '$';
//                 }
//                 if(scope.active == 'btc'){
//                     scope.total = '0.0192';
//                     scope.symbol = '' // '฿';
//                 }
//
//                 if (newV != oldV){
//
//                     element.addClass('animate-total');
//                     $timeout(function(){
//                         element.removeClass('animate-total');
//                     }, 200);
//                 }
//             })
//
//         }
//     }
// }])
