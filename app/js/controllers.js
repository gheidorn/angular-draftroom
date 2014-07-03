'use strict';

/* Controllers */

angular.module('draftroom.controllers', [])
  .controller('teamListController', function($scope, teamAPIService) {
    $scope.nameFilter = null;
    $scope.teamList = [];

    teamAPIService.getTeams().success(function (response) {
      $scope.teamList = response;
    });

  })
  .controller('playerListController', function($scope, playerAPIService) {
    $scope.nameFilter = null;
    $scope.playerList = [];
    playerAPIService.getPlayers().success(function (response) {
      $scope.playerList = response;
    });
  })
  .controller('teamController', function($scope, $routeParams, teamAPIService) {
    $scope.city = $routeParams.city;
    $scope.team = null;

    teamAPIService.getTeamDetails($routeParams.city).success(function (response) {
      $scope.team = response;
    });
  })
  .controller('draftablesController', function($scope, competitionAPIService, teamAPIService) {
    $scope.competitions = [];
    $scope.teams = [];
    $scope.players = [];
    $scope.highlightedPlayer = {};

    // on init, load the sports available
    competitionAPIService.getCompetitions().success(function(response) {
      $scope.competitions = response;
      //$scope.competitionName = $scope.competitions[0];
    });
    
    $scope.populateTeams = function() {
      var competitionSelected = $scope.competition;

      if(competitionSelected == null) {
        $scope.teams = [];
        return;
      }
        
      var teamCache = JSON.parse(window.localStorage.getItem(competitionSelected.name + "TeamCache"));
      
      if(teamCache != null) {
        console.log('teams from cache: ' + competitionSelected.name + ' - ' + teamCache.length + ' teams');
        $scope.teams = teamCache;
        return;
      } else {
        teamCache = {};
      }

      teamAPIService.getTeamsByCompetitionName(competitionSelected.name).success(function(response) {
        $scope.teams = response;
        var teamCache = JSON.parse(window.localStorage.getItem(competitionSelected.name + "TeamCache")) || {};
        teamCache = $scope.teams;
        console.log('teams from api: ' + competitionSelected.name + ' - ' + teamCache.length + ' teams');
        window.localStorage.setItem(competitionSelected.name + "TeamCache", JSON.stringify(teamCache));
      });
    }

    $scope.populatePlayers = function() {
      var teamSelected = $scope.team;

      if(teamSelected == null) {
        $scope.players = [];
        return;
      }

      var teamCache = JSON.parse(window.localStorage.getItem($scope.competition.name + "TeamCache"));

      $(".playerCard").click(function() {
        console.log('clicked ' + $(this));
      });

      if(teamCache != null) {
        for(var i=0; i<teamCache.length; i++) {
          console.log('comparing ' + teamCache[i].name + ' to ' + teamSelected.name);
          if(teamCache[i].name === teamSelected.name) {
            $scope.players = teamCache[i].players;
            return;
          }
        }

      } else {
        $scope.players = [];
      }
      return;
    }

    $scope.setHighlightedPlayer = function(player) {
      $scope.highlightedPlayer = player;
    }    

    $scope.isHovered = function(player) {
      return $scope.highlightedPlayer === player;
    }
  });