'use strict';

var loginModule = angular.module('chatApp.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider, loginService) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'ctrl',
            resolve: {
                check: function (loginService) {
                    loginService.checkedLoggedIn();
                }
            }
        });
    }])
    .controller('LoginCtrl', ['$cookieStore', 'loginService', function ($cookieStore, loginService) {
        var vm = this;

        vm.loginInfo = loginService.loginInfo;

        vm.getGravatarUrl = function (email) {
            return loginService.buildGravatarUrl(email);
        }

        vm.loginChat = function (loginInfo, loginChatForm) {
            if (loginChatForm.$valid) {
                loginService.loginChat(loginInfo);
            }
        };
    }]);

