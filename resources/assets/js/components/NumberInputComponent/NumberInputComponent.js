/**
 * Created by FG0003 on 29/12/2016.
 */

import AbstractInputController from './../AbstractInputComponent/AbstractInputController';
import NumberInputTemplate from './number-input.tpl.html';

class NumberInputController extends AbstractInputController {

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

NumberInputController.$inject = ['$scope', 'OrphaUtilService'];

export let NumberInputComponent = {
    selector: 'numberInput',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '=',
        isRequired: '=',
        max: '<',
        min: '<',
        name: '@',
        label: '@',
        icon: '@',
    },
    controller: NumberInputController,
    controllerAs: '$component',
    template: NumberInputTemplate,
    transclude: true
};
