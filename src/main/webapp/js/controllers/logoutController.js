angular.module('bikee.LogoutController', [])
  .controller('LogoutController', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';
    auth.signout();
    $scope.$parent.message = 'This is the LogoutCtrl';

    $location.path('/login');
  }]);
