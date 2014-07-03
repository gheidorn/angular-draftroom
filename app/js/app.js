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
  'ngRoute',
  'ui.bootstrap',
  'ui.templates'
]).
config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $routeProvider.
      when("/draftables", { templateUrl : "partials/draftables.html", controller : "draftablesController" }).
      when("/teamlist", { templateUrl :  "partials/teamlist.html", controller : "teamListController" }).
      when("/playerlist", { templateUrl :  "partials/playerlist.html", controller : "playerListController" }).
      when("/teams/:city", { templateUrl :  "partials/team_nfl.html", controller : "teamController" }).
      otherwise({ templateUrl : "partials/home.html", controller : function($scope) { /*console.log($scope);*/ }});
}]);


/*
run(function ($http, $angularCacheFactory) {
  $angularCacheFactory('defaultCache', {
    maxAge: 900000, // 15min expiry
    cacheFlushInterval: 6000000, // flushes every hour
    deleteOnExpire: 'aggressive' // items will be deleted right when they expire
  })

  $http.defaults.cache = $angularCacheFactory.get('defaultCache');
})
*/