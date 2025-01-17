
import Template from './simple-user-card.tpl.html';
import { AuthEvents } from './../../../../services/AuthService';
import Fallbackimg from './../../../../../img/ic_account_circle_black_48dp_2x.png';

class Controller {
    constructor(AuthService, OrphaUtilService) {

        this.fallbackimg = Fallbackimg;
        this.auth = AuthService
        OrphaUtilService.on(AuthEvents.currentUserUpdated, (event, args) => this.user = args.user);
    }

    $onInit() {
        if (this.user == null)
            this.user = this.auth.getCurrentUser();
    }
};

Controller.$inject = ['AuthService', 'OrphaUtilService'];

export let SimpleUserCardComponent = {
    selector: 'simpleUserCard',
    bindings: {
        user: '<',
        showActions: '<',
        logoutClick: '&',
        profileClick: '&'
    },
    controller: Controller,
    controllerAs: '$ctrl',
    template: Template
};