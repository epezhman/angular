'use strict';

var joinModule = angular.module('chatApp.join', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider, joinService) {
        $routeProvider.when('/join', {
            templateUrl: 'join/join.html',
            controller: 'JoinCtrl',
            controllerAs: 'ctrl',
            resolve: {
                check: function (joinService) {
                    joinService.checkedLoggedIn();
                }
            }
        });
    }])
    .controller('JoinCtrl', ['$cookieStore', 'joinService', function ($cookieStore, joinService) {
        var vm = this;

        vm.joinInfo = joinService.joinInfo;

        vm.getGravatarUrl = function (email) {
            return joinService.buildGravatarUrl(email);
        }

        vm.joinChat = function (joinInfo, joinChatForm) {
            if (joinChatForm.$valid) {
                joinService.joinChat(joinInfo);
            }
        };
    }]);