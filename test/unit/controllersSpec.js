'use strict';

/* jasmine specs for controllers go here */
/* 
  test that the controller calls the correct service methods
*/
describe('Controller: teamListController', function(){
  var $scope, ctrl, $timeout;
  
  // declare mocks for re-use in this describe() block
  var teamAPIServiceMock;
  
  // beforeEach will reset the state for each it() block
  beforeEach(function() {

    // create a "spy object" for our TeamAPIService to isolate the controller testing from the service
    teamAPIServiceMock = jasmine.createSpyObj('teamAPIService', ['getTeams', 'getTeamDetails']);

    // load the module
    module('draftroom');

    // $rootScope - injected to create a new $scope instance
    // $controller - injected to create an instance of the controller
    // $q - injected so we can create promises for our mocks
    // _$timeout_ - injected so we can flush unresolved promises
    inject(function($rootScope, $controller, $q, _$timeout_) {
      // create a scope object
      $scope = $rootScope.$new();
      
      // mock data
      var mockGetTeamsResponse = [{ "active_flag" : "Y", "city" : "Baltimore", "name" : "Ravens", "stadium" : "M&T Bank Stadium", "stadium_image_url" : "http://someurl.com/test" }, { "active_flag" : "Y", "city" : "Arizona", "name" : "Cardinals", "stadium" : "University of Phoenix Stadium", "stadium_image_url" : "http://someurl.com/test/cardinals-stadium" }];

      // set up the returns for our teamAPIServiceMock methods
      teamAPIServiceMock.getTeams.andReturn($q.when(mockGetTeamsResponse));
      teamAPIServiceMock.getTeamDetails.andReturn($q.when(mockGetTeamsResponse[0]));
      
      // assign $timeout to a scoped variable so we can flush it later.  _underscore_ trick used to keep names clean in tests
      $timeout = _$timeout_;
      
      // now run that scope through the controller function, injecting services
      ctrl = $controller('teamListController', { $scope: $scope, teamAPIService: teamAPIServiceMock });
      console.log("DO I GET HERE?");
    });

  });

  /* Test 1: The simplest of the simple.
   * here we're going to test that some things were 
   * populated when the controller function whas evaluated. */
  it('there should be 2 teams populated', function() {
    console.log($scope.teamList);

    var mockGetTeamsResponse = [{ "active_flag" : "Y", "city" : "Baltimore", "name" : "Ravens", "stadium" : "M&T Bank Stadium", "stadium_image_url" : "http://someurl.com/test" }, { "active_flag" : "Y", "city" : "Arizona", "name" : "Cardinals", "stadium" : "University of Phoenix Stadium", "stadium_image_url" : "http://someurl.com/test/cardinals-stadium" }];
    //just assert. $scope was set up in beforeEach() (above)
    expect($scope.teamList).toEqual(mockGetTeamsResponse);
  });

  /*
  it('should call getTeams TeamAPIService method', function() {
    var teams = {};

    spyOn(TeamAPIServiceMock, 'getTeams').andCallThrough();
    // do what???
    scope.$digest();
    expect(TeamAPIServiceMock.getTeams).toHaveBeenCalled();
  });
  */

});