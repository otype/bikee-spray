angular.module('mwwc.menuCtrl', [])
    .controller('MenuCtrl', ['$scope', '$location', function ($scope, $location) {
        'use strict';
        $scope.go = function (target) {
            $location.path(target);
        };
    }]);

angular.module('mwwc.msgCtrl', [])
    .controller('MsgCtrl', ['$scope', 'auth', function ($scope, auth) {
        'use strict';
        $scope.message = 'loading...';
        auth.loaded.then(function () {
            $scope.message = '';
        });
    }]);

angular.module('mwwc.rootCtrl', [])
    .controller('RootCtrl', ['$scope', 'auth', function ($scope, auth) {
        'use strict';
        $scope.$parent.message = 'Welcome ' + auth.profile.name + '!';
        $scope.auth = auth;
    }]);

angular.module('mwwc.loginCtrl', [])
    .controller('LoginCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
        'use strict';
        $scope.user = '';
        $scope.pass = '';

        function onLoginSuccess() {
            $scope.$parent.message = '';
            $location.path('/');
        }

        function onLoginFailed() {
            $scope.$parent.message = 'invalid credentials';
        }

        $scope.submit = function () {
            $scope.$parent.message = 'loading...';
            $scope.loading = true;

            auth.signin({
                connection: 'Username-Password-Authentication',
                username: $scope.user,
                password: $scope.pass,
                scope: 'openid name email'
            }).then(onLoginSuccess, onLoginFailed)
                .finally(function () {
                    $scope.loading = false;
                });
        };

        $scope.doGoogleAuthWithRedirect = function () {
            return auth.signin({connection: 'google-oauth2', scope: 'openid name email'});
        };
    }]);

angular.module('mwwc.logoutCtrl', [])
    .controller('LogoutCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
        'use strict';
        auth.signout();
        $scope.$parent.message = '';
        $location.path('/login');
    }]);
