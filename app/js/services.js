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

    teamAPI.getTeamsByCompetitionName = function(competitionName) {
      return $http({
        method: 'GET',
        url: 'https://sportslock.com/api/v2/' + competitionName + "/teams"
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
  }).
  factory('competitionAPIService', function($http) {
    var competitionAPI = {};
    competitionAPI.getCompetitions = function() {
      return $http({
        method: 'GET',
        url: 'https://sportslock.com/api/v2/sport'
      })
    }

    return competitionAPI;
  });