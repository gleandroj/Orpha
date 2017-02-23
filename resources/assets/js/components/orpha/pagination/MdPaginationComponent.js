/**
 * Created by FG0003 on 09/02/2017.
 */
import arrow_before from '../../../../img/icons/arrow-before.svg';
import arrow_first from '../../../../img/icons/navigate-first.svg';
import arrow_next from '../../../../img/icons/navigate-next.svg';
import arrow_last from '../../../../img/icons/navigate-last.svg';

import Template from './md-pagination.tpl.html';

class PaginationController{

    constructor(OrphaUtilService){
        'ngInject'
        this.util = OrphaUtilService;
        this.arrow_before = arrow_before;
        this.arrow_first = arrow_first;
        this.arrow_next = arrow_next;
        this.arrow_last = arrow_last;
    }

    get page(){
        if(this.currentPage != null && this.currentPage != 0)
            return this.currentPage;
        return 1;
    }

    set page(value){
        this.currentPage = value;
    }

    $onChanges(){
        if(this.currentPage > this.numberOfPages){
            this.currentPage = this.numberOfPages;
        }
    }

    $onInit(){

    }

    get numberOfPages(){
        if(this.nItems == 0)
            return 1;
        return Math.ceil(this.nItems/this.itemsPerPage);
    }
}

export let MdPaginationComponent = {
    selector:'mdPagination',
    bindings:{
        itemsPerPage:'=',
        currentPage:'=',
        nItems: '<',
        isDisabled: '<'
    },
    controller:PaginationController,
    controllerAs:'$pagination',
    template: Template
};
