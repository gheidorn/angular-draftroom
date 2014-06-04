'use strict';

/*
angular.module('draftroom', [
  'ngRoute',
  'draftroom.filters',
  'draftroom.services',
  'draftroom.directives',
  'draftroom.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teamlist', {templateUrl: 'partials/teamlist.html', controller: 'TeamListCtrl'});
  $routeProvider.when('/playerlist', {templateUrl: 'partials/playerlist.html', controller: 'PlayerListCtrl'});
  $routeProvider.otherwise({redirectTo: '/teamlist'});
}]);
*/

angular.module('draftroom', [
  'draftroom.controllers',
  'draftroom.services',
  'ngRoute'
]).
config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $routeProvider.
      when("/teamlist", { templateUrl :  "partials/teamlist.html", controller : "teamListController" }).
      when("/playerlist", { templateUrl :  "partials/playerlist.html", controller : "playerListController" }).
      when("/teams/:city", { templateUrl :  "partials/team_nfl.html", controller : "teamController" }).
      otherwise({ templateUrl : "partials/home.html", controller : function($scope) {console.log($scope);}});
}]);
/*.
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when("/teamlist", { templateUrl :  "partials/teamlist.html", controller : "teamListController"}).
      when("/playerlist", { templateUrl :  "partials/playerlist.html", controller : "playerListController"})
    }
]);
*/