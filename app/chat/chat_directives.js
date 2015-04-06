'use strict';


chatModule.directive('messageSent', function (joinService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'chat/message_sent.html',
        scope: {
            message: "=",
            update: "&",
            remove: "&"
        },
        controller: function($scope)
        {
            $scope.getGravatarUrl = function (email) {
                return joinService.buildGravatarUrl(email);
            }
        }
    }
}).directive('messageReceived', function (joinService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'chat/message_received.html',
        scope: {
            message: "="
        },
        controller: function($scope)
        {
            $scope.getGravatarUrl = function (email) {
                return joinService.buildGravatarUrl(email);
            }
        }
    }
});