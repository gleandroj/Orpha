/**
 * Created by FG0003 on 09/03/2017.
 */

import Template from './crianca-form.tpl.html';

class Controller {

    constructor(OrphaUtilService) {
        this._util = OrphaUtilService;
    }

    $onInit() {
        this.initialize();
    }

    initialize(){
        this.readOnly = !(this.readOnly === false || this.readOnly === 'false');
        this.isDisabled = !(this.readOnly === false || this.readOnly === 'false');
    }
}

Controller.$inject = ['OrphaUtilService'];


export let CriancaFormComponent = {
    selector: 'criancaForm',
    bindings: {
        crianca:'=',
        readOnly: '<',
        isDisabled: '<'
    },
    controller: Controller,
    controllerAs: '$form',
    template: Template
};