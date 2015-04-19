
    'use strict';
    var registerModule = angular.module('chatApp.register', ['ngRoute']);

    registerModule.config(['$routeProvider', function ($routeProvider, loginService) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'ctrl',
            resolve: {
                check: function (loginService) {
                    loginService.checkedLoggedIn();
                }
            }
        });
    }]);

    registerModule.directive("compareTo", function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });

    registerModule.controller('RegisterCtrl', ['$cookieStore', 'loginService', function ($cookieStore, loginService) {

        var register = {
            email: '',
            password: '',
            passwordConfirm: ''
        };



    }]);
