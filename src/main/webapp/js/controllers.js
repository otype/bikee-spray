angular.module('mwwc.menuCtrl', [])
  .controller('MenuCtrl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.go = function (target) {
      $location.path(target);
    };
  }]);

angular.module('mwwc.alertDemoCtrl', [])
  .controller('AlertDemoCtrl', ['$scope', function ($scope) {
    $scope.alerts = [
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function () {
      console.log('add alert');
      $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function (index) {
      console.log('close alert: ' + index);
      $scope.alerts.splice(index, 1);
    };

    $scope.singleModel = 1;
  }]);

angular.module('mwwc.msgCtrl', ['ui.bootstrap'])
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

angular.module('mwwc.dashboardController', [])
  .controller('DashboardController', ['$scope', 'auth', function ($scope, auth) {
    'use strict';
    $scope.name = auth.profile.given_name || 'you';
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
