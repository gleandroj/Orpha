/**
 * Created by hc on 19/09/16.
 */
angular.module('orpha.services')

    .service('MessagesService', function($http, $q, $mdToast){
        var msg = {};

        $http.get('../app/services/messages.json').success(function (messages) {
            msg = messages;
        });

        this.getMessage = function (msgId) {
            return msg[msgId] || msgId;
        };

        this.showToatsMessage = function (msgId) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(this.getMessage(msgId))
                    .position('top right')
                    .toastClass('toast-margin')
                    .hideDelay(4000)
            );
        };

    })
    .run(function (MessagesService) {
    });
