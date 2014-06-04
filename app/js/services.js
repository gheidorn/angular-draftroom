'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('draftroom.services', []).
  factory('teamAPIService', function($http) {

    var teamAPI = {};

    teamAPI.getTeams = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/teams'
      });
    }

    teamAPI.getTeamDetails = function(city) {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/team/nfl/' + city
      });
    }

    return teamAPI;
  }).
  factory('playerAPIService', function($http) {

    var playerAPI = {};

    playerAPI.getPlayers = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/players'
      });
    }

    return playerAPI;
  });