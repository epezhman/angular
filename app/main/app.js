'use strict';

// Declare app level module which depends on views, and components
var chatApp = angular.module('chatApp', [
    'ngRoute',
    'chatApp.login',
    'chatApp.register',
    'chatApp.chat',
    'ngCookies',
    'firebase'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
    .controller('appController', ['$scope', '$cookieStore', 'loginService', function ($scope, $cookieStore, loginService) {
        $scope.logedIn = loginService.isLoggedIn();

        $scope.logOut = function () {
            loginService.logoutChat();
            $scope.logedIn = false;
        }

        $scope.$watch(function () {
            return loginService.watcher();
        }, function (newValue) {
            $scope.logedIn = loginService.getUser();
        });
    }]);