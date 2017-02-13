/**
 * Created by FG0003 on 27/12/2016.
 */

export default class DialogService{

    constructor(OrphaUtilService, LogService, $mdDialog){
        'ngInject';
        this.dialogs = [];
        this.util = OrphaUtilService;
        this.log = LogService;
        this.mdDialog = $mdDialog;
    }

    _showDialog(options){
        return this.mdDialog.show(options);
    }

    pushDialog(options){

        options = this.util.extend({
            bindToController: true,
            hasBackdrop:true,
            multiple: true,
            skipHide: true,
            bindToControlle:true,
            controllerAs:'$ctrl',
            parent: angular.element(document.body),
            locals:{}
        }, options);

        var dialog = {
            options: options
        };

        this.dialogs.push(dialog);
        return this._showDialog(dialog.options);
    }

    showCustomDialog(options){
        return this.pushDialog(this.util.extend({autoWrap:true}, options));
    }

    showConfirmDialog(options, okCallback, cancelCallback){
        options = options || {};

        let confirm = this.mdDialog.confirm()
            .title(options.title || 'Título')
            .textContent(options.message || '?')
            .ok(options.okBtn || 'Ok')
            .cancel(options.cancelBtn || 'Cancelar');

        return this.pushDialog(confirm._options, okCallback, cancelCallback);
    }

    showAlertDialog(options, okCallback){
        options = options || {};
        let alert = this.mdDialog.alert()
            .title(options.title || 'Título')
            .textContent(options.message || '?')
            .ok(options.okBtn || 'Ok');

        return this.pushDialog(alert._options, okCallback);
    }

    hideDialog(response){
        if(this.dialogs.length > 0){
            this.dialogs.pop();
            this.mdDialog.hide(response);
        }
    }

    cancelDialog(response){
        if(this.dialogs.length > 0){
            this.dialogs.pop();
            this.mdDialog.cancel(response);
        }
    }

    clearDialogs(){
        while (this.dialogs.length > 0){
            this.dialogs.pop();
            this.cancelDialog();
        }
    }
}