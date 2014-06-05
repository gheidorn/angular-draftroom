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
  });