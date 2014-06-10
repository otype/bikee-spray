'use strict';
angular.module('mwwc.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            console.log('Calling app-version: ' + version);
            elm.text(version);
        };
    }]);
