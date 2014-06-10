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

angular
    .module('mwwc', [
        'ngCookies',
        'auth0-redirect',
        'ngRoute',
        'authInterceptor',
        'mwwc.menuCtrl',
        'mwwc.msgCtrl',
        'mwwc.rootCtrl',
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
        }])
    .config(['$routeProvider', 'authProvider', '$httpProvider',
        function ($routeProvider, authProvider, $httpProvider) {
            $routeProvider
                .when('/logout', {
                    templateUrl: 'partials/logout.html',
                    controller: 'LogoutCtrl'
                })
                .when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginCtrl',
                    resolve: { authLoaded: authLoaded }
                })
                .when('/', {
                    templateUrl: 'partials/root.html',
                    controller: 'RootCtrl',
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

