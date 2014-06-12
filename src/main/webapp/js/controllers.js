var capitalizeFirstLetter = function (message) {
  return (message !== undefined && message !== null)
    ? message.charAt(0).toUpperCase() + message.substring(1)
    : message;
};

angular.module('mwwc.UserProfileController', [])
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

angular.module('mwwc.AppController', [])
  .controller('AppController', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';

    var init = function () {
      if (!auth.isAuthenticated) {
        $location.path('/logout');
      }
    };

    init();

    $scope.go = function (target) {
      $location.path(target);
    };

    $scope.$parent.message = 'This is the AppController 1';
    $scope.message = 'This is the AppController 2';

    $scope.alerts = [
//      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//      { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function () {
      $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };
  }]);

angular.module('mwwc.DashboardController', [])
  .controller('DashboardController', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';

    var init = function () {
      if (!auth.isAuthenticated) {
        $location.path('/logout');
      }
    };

    init();

    $scope.auth = auth;

    $scope.$parent.message = 'This is the DashboardController';

    $scope.name = capitalizeFirstLetter(auth.profile.nickname) || 'you';
    $scope.teamLeft = 'Team 1';
    $scope.teamRight = 'Team 2';
  }]);


angular.module('mwwc.loginCtrl', [])
  .controller('LoginCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
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

angular.module('mwwc.logoutCtrl', [])
  .controller('LogoutCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    'use strict';
    auth.signout();
    $scope.$parent.message = 'This is the LogoutCtrl';

    $location.path('/login');
  }]);
