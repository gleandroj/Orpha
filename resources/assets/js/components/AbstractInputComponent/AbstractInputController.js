/**
 * Created by FG0003 on 09/03/2017.
 */

export default class AbstractInputController {

    constructor($scope, OrphaUtilService){
        this.scope = $scope;
        this.util = OrphaUtilService;
        this._value = null;
    }

    initialize(){

        this.name = this.name || 'input_'+Math.random().toString(36).slice(2).substr(0, 5);
        this.label = this.label || '';
        this.icon = this.icon || null;
        this.type = this.type || 'text';

        this.isDisabled = this.isDisabled || false;
        this.isRequired = this.isRequired || false;

        this.maxLength = this.maxLength || null;
        this.minlength = this.minlength || 0;

        this.inputMask = this.inputMask || '*';

        this.util.timeout(()=> this.setupValidation(), 1);
    }

    get form(){
        return this.scope['_form_'+this.name];
    }

    set value(value){
        this._value = value;
    }

    get value(){
        return this._value;
    }

    setupValidation(){
        this.model.$validators = this.form[this.name].$validators;
        this.validate();
    }

    $onInit(){
        this.model.$render = () => this.value = this.model.$viewValue;
        this.util.timeout(()=> this.initialize(), 0);
    }

    $onChange(){
        this.validate();
    }

    onChange(){
        this.model.$setViewValue(this.value);
        this.validate();
    }

    validate(){
        this.model.$validate();
        this.form[this.name].$validate();
    }

    get errors(){
        return this.form && this.name ? this.form[this.name].$error : null;
    }

    get valid(){
        return this.form[this.name].$valid;
    }

    get invalid(){
        return this.form[this.name].$invalid;
    }
}