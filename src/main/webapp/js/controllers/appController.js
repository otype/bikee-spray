angular.module('bikee.AppController', [])
  .controller('AppController', ['$scope', '$location', function ($scope, $location) {
    'use strict';

    $scope.go = function (target) {
      $location.path(target);
    };

//    $scope.$parent.message = 'This is the AppController 1';
//    $scope.message = 'This is the AppController 2';

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
