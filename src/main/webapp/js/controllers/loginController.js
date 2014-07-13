angular.module('bikee.LoginController', [])
  .controller('LoginController', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';

    $scope.login = function () {
      $scope.$parent.message = 'Loading ...';
      $scope.doPopupAuth();
    };

    $scope.doPopupAuth = function() {
      return auth.signin({popup: true});
    };

    $scope.doGoogleAuthWithRedirect = function () {
      return auth.signin({connection: 'google-oauth2', scope: 'openid name email'});
    };
  }]);
