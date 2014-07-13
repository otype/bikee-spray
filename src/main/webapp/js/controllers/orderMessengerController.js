angular.module('bikee.OrderMessengerController', ['ui.bootstrap'])
  .controller('OrderMessengerController', ['$rootScope', '$scope', '$modal', '$log', function ($rootScope, $scope, $modal, $log) {
    'use strict';

    $scope.message = '';

    $scope.today = function () {
      $rootScope.order.orderDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $rootScope.order.orderDate = new Date();
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };

    /*
     * TIME
     */

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.changed = function () {
      console.log('Time changed to: ' + $rootScope.order.orderDate);
    };

//    /*
//     * MODAL
//     */
//    $scope.items = ['item1', 'item2', 'item3'];
//
//    $scope.open = function (size) {
//
//      var modalInstance = $modal.open({
//        templateUrl: 'myModalContent.html',
//        controller: 'ModalInstanceCtrl',
//        size: size,
//        resolve: {
//          items: function () {
//            return $scope.items;
//          }
//        }
//      });
//
//      modalInstance.result.then(function (selectedItem) {
//        $scope.selected = selectedItem;
//      }, function () {
//        $log.info('Modal dismissed at: ' + new Date());
//      });
//    };
  }]);
