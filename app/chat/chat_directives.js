'use strict';


chatModule.directive('messageSent', function (loginService) {
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
                return loginService.buildGravatarUrl(email);
            }
        }
    }
}).directive('messageReceived', function (loginService) {
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
                return loginService.buildGravatarUrl(email);
            }
        }
    }
});