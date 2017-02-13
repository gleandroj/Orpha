/**
 * Created by FG0003 on 10/02/2017.
 */

import Template from './user-form.tpl.html';
import Fallbackimg from './../../../../../img/ic_account_circle_black_48dp_2x.png';

class Controller {

    constructor(OrphaUtilService) {
        this._util = OrphaUtilService;
        this.fallbackimg = Fallbackimg;
        this.selectedPage = 'dados';
    }

    $onInit() {
        this.initialize();
    }

    initialize(){
        this.readOnly = !(this.readOnly === false || this.readOnly === 'false');
    }
}

export let UserFormComponent = {
    selector: 'userForm',
    bindings: {
        user:'=',
        readOnly: '<'
    },
    controller: Controller,
    controllerAs: '$form',
    templateUrl: Template
};