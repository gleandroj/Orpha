/**
 * Created by FG0003 on 10/02/2017.
 */

import Template from './crianca-list.tpl.html';
import Fallbackimg from './../../../../../img/ic_account_circle_black_48dp_2x.png';

class Controller {

    constructor(OrphaUtilService) {
        'ngInject'
        this._util = OrphaUtilService;
        this.fallbackimg = Fallbackimg;
    }

    $onInit() {
        this.title = this.title || 'Crianças';

        this.criancas = this.criancas || [];

        this.filter = this.filter || '';

        this.isDisabled = this.isDisabled || false;
        this.disablePagination  = ((this.disablePagination === true || this.disabledPagination === 'true'));

        this.showPiaBtn =  (!(this.showPiaBtn === false || this.showPiaBtn === 'false'));
        this.showPrimaryBtn =  (!(this.showPrimaryBtn === false || this.showPrimaryBtn === 'false'));
        this.showSecondaryBtn = (!(this.showSecondaryBtn === false || this.showSecondaryBtn === 'false'));

        this.piaBtnDisabled = this.piaBtnDisabled || false;
        this.primaryBtnDisabled = this.primaryBtnDisabled || false;
        this.secondaryBtnDisabled = this.secondaryBtnDisabled || false;

        this.primaryBtnText = this.primaryBtnText || 'Primary Btn';
        this.secondaryBtnText = this.secondaryBtnText || 'Secondary Btn';

        this.primaryBtnIcon = this.primaryBtnIcon || 'touch_app';
        this.secondaryBtnIcon = this.secondaryBtnIcon || 'touch_app';

        this.filteredCriancasCurrentPage = 1;
        this.filteredCriancasItemsPerPage = 5;

        this.backgroundColor = this.backgroundColor || false;

        this.onCriancaClick = this.onCriancaClick || function(){};
        this.onPrimaryBtnClick = this.onPrimaryBtnClick || function(){};
        this.onSecondaryBtnClick = this.onSecondaryBtnClick || function(){};
    }

    ceil(number){
        return Math.ceil(number);
    }
}

export let CriancaListComponent = {
    selector: 'criancaList',
    bindings: {
        criancas: '<',

        title: '@',

        search: '<',

        isDisabled: '<',

        disablePagination: '<',

        filter: '<',

        onCriancaClick: '&',

        onPiaBtnClick: '&',
        onPrimaryBtnClick: '&',
        onSecondaryBtnClick: '&',

        showPiaBtn: '<',
        showPrimaryBtn: '<',
        showSecondaryBtn: '<',

        piaBtnDisabled: '<',
        primaryBtnDisabled: '<',
        secondaryBtnDisabled: '<',

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