/**
 * Created by FG0003 on 29/12/2016.
 */

import AbstractInputController from './../AbstractInputComponent/AbstractInputController';
import TextInputTemplate from './text-input.tpl.html';

class TextInputController extends AbstractInputController {

    constructor($scope, OrphaUtilService) {
        super($scope, OrphaUtilService);
    }

    initialize(){
        super.initialize();

        this.checkMatch = this.checkMatch || false;
        this.match = this.match || null;

        if(this.type != 'text' && this.type != 'email' && this.type != 'password')
            throw 'O tipo deve ser "text" ou "email" ou "password"';
    }

    setupValidation(){
        super.setupValidation();

        if(this.checkMatch){
            this.model.$validators.match = () => this.checkMatchFn(this.model.$viewValue, this.match);
            this.scope.$watch('$ctrl.match', () => this.validate());
        }

        this.validate();
    }

    checkMatchFn(value1, value2){
        return ((value1 === null || value1 === "" || value1 === undefined) && (value2 === null || value2 === "" || value2 === undefined)) || (value1 === value2);
    }
}

TextInputController.$inject = ['$scope', 'OrphaUtilService'];

export let TextInputComponent = {
    selector: 'textInput',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '<',
        isRequired: '<',
        maxLength: '<',
        minLength: '<',
        checkMatch: '<',
        match: '<',
        name: '@',
        label: '@',
        icon: '@',
        type: '@'
    },
    controller: TextInputController,
    controllerAs: '$component',
    template: TextInputTemplate,
    transclude: true
};