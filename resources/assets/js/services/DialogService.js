/**
 * Created by FG0003 on 27/12/2016.
 */

export function DialogServiceProvider() {
    var _showMultipleDialogs = false;

    this.showMultipleDialogs = function (allow) {
        _showMultipleDialogs = allow;
    };

    this.$get = ['OrphaUtilService', 'LogService', '$mdDialog', (OrphaUtilService, LogService, $mdDialog) => {

        return new DialogService(OrphaUtilService, LogService, $mdDialog, _showMultipleDialogs);

    }];
}

class DialogService {

    constructor(OrphaUtilService, LogService, $mdDialog, showMultipleDialogs) {
        this.dialogs = [];
        this.util = OrphaUtilService;
        this.log = LogService;
        this.mdDialog = $mdDialog;
        this.showMultipleDialogs = showMultipleDialogs;
    }

    _showDialog(options) {
        return this.mdDialog.show(options);
    }

    pushDialog(options) {
        var dialog = {
            show: false,
            options: null,
            defer: this.util.defer(),
            element: null,
            scope: null,
            hideCalled: false,
            cancelCalled: false
        };

        dialog.options = this.util.extend({
            clickOutsideToClose: true,
            fullscreen: false,
            bindToController: true,
            hasBackdrop: true,
            multiple: this.showMultipleDialogs,
            bindToControlle: true,
            escapeToClose: true,
            controllerAs: '$ctrl',
            parent: angular.element(document.body),
            locals: {},
            preserveScope: true,
            onComplete: (scope, element)=> this.onDialogCompleted(dialog, scope, element),
            onRemoving: (element, removePromise)=> this.onDialogRemoving(dialog, element, removePromise)
        }, options);

        if (this.dialogs.length > 0) {
            this.dialogs[this.dialogs.length - 1].show = false;
        }

        this.dialogs.push(dialog);
        this._showDialog(dialog.options).then((response) => this.onDialogHidden(dialog, response), (response)=> this.onDialogCanceled(dialog, response));
        return dialog.defer.promise;
    }

    restoreDialog(dialog) {
        if(dialog.show !== false) return;

        dialog.options = {
            bindToController: true,
            preserveScope: true,
            parent: angular.element(document.body),
            clickOutsideToClose: dialog.options.clickOutsideToClose,
            fullscreen: dialog.options.fullscreen,
            hasBackdrop: dialog.options.hasBackdrop,
            multiple: this.showMultipleDialogs,
            escapeToClose: dialog.options.escapeToClose,
            controllerAs: dialog.options.controllerAs,
            template: dialog.scope[dialog.options.controllerAs].$$ngTemplate,
            controller: () => dialog.scope[dialog.options.controllerAs],
            onComplete: (scope, element)=> this.onDialogCompleted(dialog, scope, element),
            onRemoving: (element, removePromise)=> this.onDialogRemoving(dialog, element, removePromise)
        };
        this._showDialog(dialog.options).then((response) => this.onDialogHidden(dialog, response), (response)=> this.onDialogCanceled(dialog, response));
    }

    onDialogRemoving(dialog, element, promise) {
        if (dialog.show === true) { //(dialog.hideCalled || dialog.cancelCalled) || (dialog.show === true && this.dialogs.length > 0)

            this.dialogs.pop();

            if (this.dialogs.length > 0) {
                this.restoreDialog(this.dialogs[this.dialogs.length - 1]);
            }
        }
    }

    onDialogCompleted(dialog, scope, element) {
        dialog.show = true;
        dialog.element = element;

        if(dialog.scope == null)
            dialog.scope = scope;
        else{
            let oldScope = dialog.scope;
            dialog.scope = dialog.scope[dialog.options.controllerAs].scope = dialog.scope[dialog.options.controllerAs].$scope = scope;
            oldScope.$destroy();
        }

        /* if (dialog.options.escapeToClose) {
             dialog.element.bind('keydown keypress', (event)=> dialog.cancelCalled = dialog.cancelCalled || event.which === 27);
         }
         if (dialog.options.clickOutsideToClose) {
             element.bind('click', (event)=> dialog.cancelCalled = dialog.cancelCalled || (event.target == dialog.element[0]));
         }*/
    }

    onDialogHidden(dialog, response) {
        if (dialog.show === true){
            dialog.defer.resolve(response);
        }
    }

    onDialogCanceled(dialog, response) {
        if (dialog.show === true){
            dialog.defer.reject(response);
        }
    }

    showCustomDialog(options) {
        return this.pushDialog(this.util.extend({autoWrap: true}, options));
    }

    showConfirmDialog(options) {
        options = options || {};

        let confirm = this.mdDialog.confirm()
            .title(options.title || 'Título')
            .textContent(options.message || '?')
            .ok(options.okBtn || 'Ok')
            .cancel(options.cancelBtn || 'Cancelar');

        return this.pushDialog(confirm._options);
    }

    showAlertDialog(options) {
        options = options || {};

        let alert = this.mdDialog.alert()
            .title(options.title || 'Título')
            .textContent(options.message || '?')
            .ok(options.okBtn || 'Ok');

        return this.pushDialog(alert._options);
    }

    hideDialog(response) {
        if (this.dialogs.length > 0) {
            let dialog = this.dialogs[this.dialogs.length - 1];
            dialog.hideCalled = true;
            this.mdDialog.hide(response);
        }
    }

    cancelDialog(response) {
        if (this.dialogs.length > 0) {
            let dialog = this.dialogs[this.dialogs.length - 1];
            dialog.cancelCalled = true;
            this.mdDialog.cancel(response);
        }
    }

    clearDialogs() {
        while (this.dialogs.length > 0) {
            this.cancelDialog();
        }
    }
}