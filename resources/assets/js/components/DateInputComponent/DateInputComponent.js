/**
 * Created by FG0003 on 29/12/2016.
 */

import AbstractInputComponent from './../AbstractInputComponent/AbstractInputController'
import DateInputTemplate from './date-input.tpl.html';

class DateInputController extends AbstractInputComponent {

    constructor($scope, OrphaUtilService) {
        super($scope, OrphaUtilService);
    }

    initialize() {
        super.initialize();
        let _date = new Date();
        this.maxDate = !this.maxDate ? new Date(_date.getFullYear() - 50, _date.getMonth(), _date.getDate()) : this.maxDate;
        this.minDate = !this.minDate ? new Date(_date.getFullYear() + 50, _date.getMonth(), _date.getDate()) : this.minDate;
        this.filterDate = this.filterDate || function () { return true; }
    }

    setupValidation() {
        super.setupValidation();
        let self = this;
        this.model.$validators.valid = function () {
            return Object.keys(self.errors).indexOf('valid') === -1;
        };
        this.scope.$watch(function(){ return self.form[self.name].$valid }, function () {
            self.validate();
        })
    }
}

DateInputController.$inject = ['$scope', 'OrphaUtilService'];

export let DateInputComponent = {
    selector: 'dateInput',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '<',
        isRequired: '<',
        maxDate: '<',
        minDate: '<',
        filterDate:'<',
        name: '@',
        title: '@',
        label: '@'
    },
    controller: DateInputController,
    controllerAs: '$component',
    template: DateInputTemplate,
    transclude: true
};
