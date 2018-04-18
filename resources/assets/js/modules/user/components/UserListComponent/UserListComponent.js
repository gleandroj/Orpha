/**
 * Created by FG0003 on 10/02/2017.
 */

import Template from './user-list.tpl.html';
import Fallbackimg from './../../../../../img/ic_account_circle_black_48dp_2x.png';

class Controller {
    constructor(OrphaUtilService) {

        this._util = OrphaUtilService;
        this.fallbackimg = Fallbackimg;
    }

    $onInit() {
        this.title = this.title || 'Usuários';

        this.users = this.users || [];

        this.filter = this.filter || '';

        this.isDisabled = this.isDisabled || false;
        this.disablePagination  = ((this.disablePagination === true || this.disabledPagination === 'true'));

        this.primaryBtnText = this.primaryBtnText || 'Primary Btn';
        this.secondaryBtnText = this.secondaryBtnText || 'Secondary Btn';

        this.showPrimaryBtn =  (!(this.showPrimaryBtn === false || this.showPrimaryBtn === 'false'));
        this.showSecondaryBtn = (!(this.showSecondaryBtn === false || this.showSecondaryBtn === 'false'));

        this.primaryBtnDisabled = this.primaryBtnDisabled || false;
        this.secondaryBtnDisabled = this.secondaryBtnDisabled || false;

        this.checkPrimaryBtnDisabled = this.checkPrimaryBtnDisabled || function(){ return false; };
        this.checkSecondaryBtnDisabled = this.checkSecondaryBtnDisabled || function(){ return false; };

        this.primaryBtnIcon = this.primaryBtnIcon || 'touch_app';
        this.secondaryBtnIcon = this.secondaryBtnIcon || 'touch_app';

        this.filteredUsersCurrentPage = 1;
        this.filteredUsersItemsPerPage = 5;

        this.backgroundColor = this.backgroundColor || false;

        this.onUserClick = this.onUserClick || function(){};
        this.onPrimaryBtnClick = this.onPrimaryBtnClick || function(){};
        this.onSecondaryBtnClick = this.onSecondaryBtnClick || function(){};
    }

    ceil(number){
        return Math.ceil(number);
    }
}

Controller.$inject = ['OrphaUtilService'];

export let UserListComponent = {
    selector: 'userList',
    bindings: {
        users: '<',

        title: '@',

        search: '<',

        isDisabled: '<',

        disablePagination: '<',

        filter: '<',

        onUserClick: '&',

        onPrimaryBtnClick: '&',
        onSecondaryBtnClick: '&',

        showPrimaryBtn: '<',
        showSecondaryBtn: '<',

        primaryBtnDisabled: '<',
        secondaryBtnDisabled: '<',


        checkPrimaryBtnDisabled: '&',
        checkSecondaryBtnDisabled: '&',

        primaryBtnIcon: '@',
        secondaryBtnIcon: '@',

        primaryBtnText: '@',
        secondaryBtnText: '@',

        backgroundColor: '<'
    },
    controller: Controller,
    controllerAs: '$component',
    template: Template
};