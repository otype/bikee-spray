'use strict';

function authLoaded(auth) {
  return auth.loaded;
}

function isAuthenticated($q, auth) {
  var deferred = $q.defer();

  auth.loaded.then(function () {
    if (auth.isAuthenticated) {
      deferred.resolve();
    } else {
      deferred.reject();
    }
  });
  return deferred.promise;
}

angular.module('mwwc.routes', [])
  .config(['$routeProvider', 'authProvider', '$httpProvider',
    function ($routeProvider, authProvider, $httpProvider) {
      $routeProvider
        .when('/logout', {
          templateUrl: 'views/logout.html',
          controller: 'LogoutCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          resolve: { authLoaded: authLoaded }
        })
        .when('/', {
          templateUrl: 'views/root.html',
          controller: 'RootCtrl',
          /* isAuthenticated will prevent user access to forbidden routes */
          resolve: { isAuthenticated: isAuthenticated }
        })
        .when('/dashboard', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardController',
          /* isAuthenticated will prevent user access to forbidden routes */
          resolve: { isAuthenticated: isAuthenticated }
        })
        .otherwise({ redirectTo: '/login' });

      authProvider.init({
        domain: 'otype.auth0.com',
        clientID: 'gtiifauZ5ibeOK9DyEXFFLHTRUXfb3De',
        callbackURL: 'http://localhost:8080/'
      });


      // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
      // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
      // want to check the delegation-token example
      $httpProvider.interceptors.push('authInterceptor');
    }])
;

