'use strict';

angular.module('mwwc', [
  'ngCookies',
  'auth0-redirect',
  'ngRoute',
  'authInterceptor',
  'mwwc.routes',
  'mwwc.AppController',
  'mwwc.DashboardController',
  'mwwc.UserProfileController',
  'mwwc.loginCtrl',
  'mwwc.logoutCtrl'
])
  .run(['$rootScope', '$location', '$route', 'AUTH_EVENTS', '$timeout',
    function ($rootScope, $location, $route, AUTH_EVENTS, $timeout) {
      $rootScope.$on('$routeChangeError', function () {
        var otherwise = $route.routes && $route.routes.null && $route.routes.null.redirectTo;
        // Access denied to a route, redirect to otherwise
        $timeout(function () {
          $location.path(otherwise);
        });
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        // TODO Handle when login succeeds
        $location.path('/');
      });
      $rootScope.$on(AUTH_EVENTS.loginFailure, function () {
        // TODO Handle when login fails
        window.alert('login failed');
      });
    }]);

