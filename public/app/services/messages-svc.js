/**
 * Created by hc on 19/09/16.
 */
angular.module('orpha.services')

    .service('MessagesService', function($http, $q, $mdToast, $mdDialog){
        var msg = {};

        $http.get('../app/services/messages.json').success(function (messages) {
            msg = messages;
        });

        this.getMessage = function (msgId) {
            return msg[msgId] || msgId;
        };

        this.showToatsMessage = function (msgId, time) {
            var time = time || 4000;

            if(this.getMessage)
                var msg = this.getMessage(msgId);
            else
                var msg = msgId;

            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('top right')
                    .toastClass('toast-margin')
                    .hideDelay(time)
            );
        };
        
        this.showErrorMessage = function (msgId, time) {

            if(msgId == null) return;

            var time = time || 4000;
            var msg = '';

            if(typeof msgId === 'string'){
                if(this.getMessage)
                    msg = this.getMessage(msgId);
                else
                    msg = msgId;
            }
            else if(msgId['data'] && typeof msgId['data'] === 'string'){
                msg = msgId['data'];
            }
            else if(msgId['data'] && typeof msgId['data']['error'] === 'string'){
                msg = msgId['data']['error'];
            }
            else if(msgId['error'] && typeof msgId['error'] === 'string'){
                msg = msgId['error'];
            }

            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('top right')
                    .toastClass('toast-margin md-error-toast-theme')
                    .hideDelay(time)
            );
        };

        this.showSuccessMessage = function (msgId, time) {
            var time = time || 4000;

            if(this.getMessage)
                var msg = this.getMessage(msgId);
            else
                var msg = msgId;

            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('top right')
                    .toastClass('toast-margin md-success-toast-theme')
                    .hideDelay(time)
            );
        };

        this.showConfirmDialog = function (msgId) {
            var confirm = $mdDialog.confirm()
                .title(this.getMessage(msgId))
                .ariaLabel('Confirmation')
                .ok('Sim')
                .cancel('Não');
            return $mdDialog.show(confirm);
        };
    })
    .run(function (MessagesService) {
    });
