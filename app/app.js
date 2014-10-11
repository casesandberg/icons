'use strict';

angular.module('icons', [
	'ngRoute',
	'ngAnimate',
	'firebase',
	'search',
	'templates'
])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
    })
    .otherwise({
        redirectTo: '/search'
    });

}]);

angular.module('templates', []);
