'use strict';

// Declare app level module which depends on views, and components
var chatApp = angular.module('chatApp', [
    'ngRoute',
    'chatApp.login',
    'chatApp.register',
    'chatApp.chat',
    'ngCookies'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
    .controller('appController', ['$scope', '$cookieStore', 'loginService', function ($scope, $cookieStore, loginService) {
        $scope.logedIn = loginService.getUser();

        $scope.logOut = function () {
            loginService.leaveChat();
            $scope.logedIn = false;
        }

        $scope.$watch(function () {
            return loginService.watcher();
        }, function (newValue) {
            $scope.logedIn = loginService.getUser();
        });
    }]);