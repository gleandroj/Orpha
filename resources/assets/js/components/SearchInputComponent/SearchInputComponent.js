/**
 * Created by FG0003 on 29/12/2016.
 */

import AbstractInputController from './../AbstractInputComponent/AbstractInputController';
import SearchInputTemplate from './search-input.tpl.html';

class SearchInputController extends AbstractInputController {

    constructor($scope, OrphaUtilService) {
        super($scope, OrphaUtilService);
    }

    initialize(){
        super.initialize();
    }

    setupValidation(){
        super.setupValidation();
    }

}

SearchInputController.$inject = ['$scope', 'OrphaUtilService'];

export let SearchInputComponent = {
    selector: 'searchInput',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '<',
        isRequired: '<',
        maxLength: '<',
        minLength: '<',
        name: '@',
        label: '@'
    },
    controller: SearchInputController,
    controllerAs: '$component',
    template: SearchInputTemplate,
    transclude: true
};
