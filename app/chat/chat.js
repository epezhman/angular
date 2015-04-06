'use strict';

var chatModule = angular.module('chatApp.chat', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URI', 'https://rostlab-angular-chat.firebaseio.com/messages/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatCtrl',
            controllerAs: 'ctrl',
            resolve: {
                check: function (joinService) {
                    joinService.checkedLoggedIn();
                }
            }
        });
    }])
    .controller('ChatCtrl', function (MessageService, $anchorScroll, joinService) {
        var vm = this;

        vm.newMessage = {name: '', email: '', message: '', create_datetime: '', edited:false};
        vm.messages = MessageService.getMessages();
        vm.sortoder = '-create_datetime';
        vm.currentEmail = joinService.getUser().email;

        vm.addMessage = function (chatMessageForm) {
            if (chatMessageForm.$valid) {
                vm.newMessage.email = joinService.getUser().email;
                vm.newMessage.name = joinService.getUser().name;
                MessageService.addMessage(angular.copy(vm.newMessage));
                vm.newMessage = {name: '', email: '', message: '', create_datetime: '', edited:false};
                chatMessageForm.$setPristine();
                chatMessageForm.$setUntouched();
            }
        };

        vm.updateMessage = function (message) {
            MessageService.updateMessage(message);
        };

        vm.removeMessage = function (message) {
            MessageService.removeMessage(message);
        };

        vm.scrollUp = function () {
            $anchorScroll();
        };

    })
    .service('MessageService', function ($firebaseArray, FIREBASE_URI, joinService) {
        var service = this;
        var ref = new Firebase(FIREBASE_URI);
        var messages = $firebaseArray(ref);

        service.getMessages = function () {
            return messages;
        };

        service.addMessage = function (message) {
            message.create_datetime = Firebase.ServerValue.TIMESTAMP;
            messages.$add(message);
        };

        service.updateMessage = function (message) {
            message.edited = true;
            messages.$save(message);
        };

        service.removeMessage = function (message) {
            messages.$remove(message);
        };
    });