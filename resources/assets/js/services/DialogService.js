/**
 * Created by FG0003 on 27/12/2016.
 */

export function DialogServiceProvider() {
    var _showMultipleDialogs = false;

    this.showMultipleDialogs = function (allow) {
        _showMultipleDialogs = allow;
    };
    this.$get = (OrphaUtilService, LogService, $mdDialog) => {
        'ngInject';
        return new DialogService(OrphaUtilService, LogService, $mdDialog, _showMultipleDialogs);
    };
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

    getLastDialog() {
        return this.dialogs.length > 0 ? this.dialogs[this.dialogs.length - 1] : null;
    }

    pushDialog(options) {
        var dialog = {
            show: true,
            options: null,
            promisse: null,
            element: null,
            scope: null,
            hideCalled: false,
            cancelCalled: false
        };
        let showingDialog = null;

        dialog.options = this.util.extend({
            bindToController: true,
            hasBackdrop: true,
            multiple: this.showMultipleDialogs,
            skipHide: true,
            bindToControlle: true,
            controllerAs: '$ctrl',
            parent: angular.element(document.body),
            locals: {},
            preserveScope: true,
            onComplete: (scope, element)=> {
                dialog.scope = scope;
                dialog.element = element;
                this.dialogs.push(dialog);
            },
            onRemoving: (element, removePromise)=> {
                if (this.dialogs.indexOf(dialog) > -1 && !(dialog.hideCalled || dialog.cancelCalled) && dialog.show === true) {
                    this.popDialog();
                }
            }
        }, options);

        if ((showingDialog = this.getLastDialog()) != null) {
            showingDialog.show = false;
        }
        dialog.promisse = this._showDialog(dialog.options);
        return dialog.promisse;
    }

    restoreDialog(dialog){
        dialog.show = true;
        dialog.options = {
            hasBackdrop: true,
            multiple: this.showMultipleDialogs,
            skipHide: true,
            controllerAs: dialog.options.controllerAs,
            parent: angular.element(document.body),
            preserveScope: true,
            onComplete: (scope, element)=> {
                dialog.scope = scope;
                dialog.element = element;
            },
            onRemoving: (element, removePromise)=> {
                if (this.dialogs.indexOf(dialog) > -1 && !(dialog.hideCalled || dialog.cancelCalled) && dialog.show === true) {
                    this.popDialog();
                }
            }
        };
        dialog.options.controller = ()=>{ return dialog.scope[dialog.options.controllerAs] };
        dialog.options.template = dialog.scope[dialog.options.controllerAs].$$ngTemplate;
        dialog.promise = this._showDialog(dialog.options);
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

    popDialog() {
        this.dialogs.pop();

        if(this.dialogs.length > 0 && !this.showMultipleDialogs){
            this.restoreDialog(this.getLastDialog());
        }
    }

    hideDialog(response) {
        if (this.dialogs.length > 0) {
            let dialog = this.getLastDialog();
            dialog.hideCalled = true;
            this.popDialog();
            this.mdDialog.hide(response);
        }
    }

    cancelDialog(response) {
        if (this.dialogs.length > 0) {
            let dialog = this.getLastDialog();
            dialog.cancelCalled = true;
            this.popDialog();
            this.mdDialog.cancel(response);
        }
    }

    clearDialogs() {
        while (this.dialogs.length > 0) {
            this.popDialog();
            this.cancelDialog();
        }
    }
}