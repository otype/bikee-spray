angular.module('bikee.UserProfileController', [])
  .controller('UserProfileController', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';

    var init = function () {
      if (!auth.isAuthenticated) {
        $location.path('/logout');
      }
    };

    init();

    $scope.auth = auth;
    $scope.$parent.message = 'This is the UserProfileController';
  }]);
