'use strict';

angular.module('bikee.routes', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/order', {
        templateUrl: 'views/order_messenger_step_1.html',
        controller: 'OrderMessengerController'
      })
      .when('/order_step_2', {
        templateUrl: 'views/order_messenger_step_2.html',
        controller: 'OrderMessengerController'
      })
      .when('/order_pre_confirmation', {
        templateUrl: 'views/order_pre_confirmation.html',
        controller: 'OrderMessengerController'
      })
      .when('/order_error', {
        templateUrl: 'views/order_error.html',
        controller: 'OrderMessengerController'
      })
      .otherwise({ redirectTo: '/order' });
  }]);
