'use strict';

// Declare app level module which depends on views, and components
var chatApp = angular.module('chatApp', [
    'ngRoute',
    'chatApp.join',
    'chatApp.chat',
    'ngCookies'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/join'});
    }])
    .controller('appController', ['$scope', '$cookieStore', 'joinService', function ($scope, $cookieStore, joinService) {
        $scope.logedIn = joinService.getUser();

        $scope.logOut = function () {
            joinService.leaveChat();
            $scope.logedIn = false;
        }

        $scope.$watch(function () {
            return joinService.watcher();
        }, function (newValue) {
            $scope.logedIn = joinService.getUser();
        });
    }]);