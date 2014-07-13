'use strict';

angular.module('bikee', [
  'ui.bootstrap',
  'ngCookies',
  'ngRoute',
  'bikee.routes',
  'bikee.AppController',
//  'bikee.ModalDemoCtrl',
//  'bikee.ModalInstanceCtrl',
  'bikee.OrderMessengerController'
])
  .run(['$rootScope', function ($rootScope) {
    $rootScope.message = '';
    $rootScope.order = {};
    $rootScope.order.startLocation = {};
    $rootScope.order.endLocation = {};
  }]);

