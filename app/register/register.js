'use strict';
var registerModule = angular.module('chatApp.register', ['ngRoute', 'firebase'])
    .config(['$routeProvider', function ($routeProvider, loginService, $firebaseAuth) {
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
    }])

    // used for comparing the two passwords
    .directive("compareTo", function () {
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
    })
    .controller('RegisterCtrl', ['loginService', '$firebaseAuth', '$firebaseArray', function (loginService, $firebaseAuth, $firebaseArray) {
        this.register = {};

        this.createUser = function () {
            var ref = new Firebase("https://rostlab-angular-chat.firebaseio.com/");
            var auth = $firebaseAuth(ref);
            var userMeta = $firebaseArray(ref);

            auth.$createUser({
                email: this.register.email,
                password: this.register.password,
            }).then(function (authData) {
                // TODO: create userMeta Array (username, email) as lookup table for messages -> username should be displayed
                console.log("Successfully created user account with uid:", authData.uid);
                alert('Account successfully created!');
                // TODO: redirect to login page or log the user in and redirect to chat view
            }).catch(function (error) {
                console.log("Authentication failed:", error);
                alert('Login failed: ' + error);
            });
        };

        this.getGravatarUrl = function (email) {
            return loginService.buildGravatarUrl(email);
        }

    }]);
