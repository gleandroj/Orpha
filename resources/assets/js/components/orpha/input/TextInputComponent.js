/**
 * Created by FG0003 on 29/12/2016.
 */

import TextInputTemplate from './text-input.tpl.html';
import NumberInputTemplate from './number-input.tpl.html';
import FileInputTemplate from './file-input.tpl.html';
import SearchInputTemplate from './search-input.tpl.html';
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';

class TextInputController{

    constructor($scope, OrphaUtilService, $http){
        'ngInject'
        this.scope = $scope;
        this.util = OrphaUtilService;
        this.http = $http;
    }

    initialize(){
        let self = this;

        this.isDisabled = this.isDisabled || false;
        this.isRequired = this.isRequired || false;
        this.maxLength = this.maxLength || null;
        this.minlength = this.minlength || 0;
        this.checkMatch = this.checkMatch || false;
        this.checkEmail = this.checkEmail || false;
        this.match = this.match || null;
        this.name = this.name || 'input_'+Math.random().toString(36).slice(2).substr(0, 5);
        this.label = this.label || '';
        this.icon = this.icon || null;
        this.type = this.type || 'text';
        this.inputMask = this.inputMask || '*';

        //this.form = this.scope['_form_'+this.name];

        this.util.timeout(()=> {
            self.form = self.scope['_form_'+self.name];

            self.model.$validators = self.form[this.name].$validators;

            if(self.checkMatch){
                self.model.$validators.match = () => self.checkMatchFn(self.model.$viewValue, self.match);
                self.scope.$watch('$ctrl.match', () => self.validate());
            }

            self.validate();

            if(self.type != 'text' && self.type != 'email' && self.type != 'password')
                throw 'O tipo deve ser "text" ou "email" ou "password"';
        }, 1);

    }

    $onInit(){
        var self = this;
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

    checkMatchFn(value1, value2){
        return ((value1 === null || value1 === "" || value1 === undefined) && (value2 === null || value2 === "" || value2 === undefined)) || (value1 === value2);
    }

    validate(){
        this.model.$validate();
        this.form[this.name].$validate();
    }
}

class FileInputController{

    constructor($scope, OrphaUtilService, CameraService){
        'ngInject'
        this.scope = $scope;
        this.util = OrphaUtilService;
        this.cameraService = CameraService;

        this.fallbackImg = FallbackImg;
        this.b64regex = new RegExp(/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/);
        this.urlRegex = new RegExp(/(http(s?):)|([\/|.|\w|\s])*\.(?:jpeg|png|jpg|gif|bmp)/);
    }

    initialize(){
        let self = this;

        this.isDisabled = this.isDisabled || false;
        this.isRequired = this.isRequired || false;
        this.preview = this.preview || false;
        this.showButtons = this.showButtons || false;
        this.name = this.name || 'input_'+Math.random().toString(36).slice(2).substr(0, 5);

        this.util.timeout(()=>{

            self.model.$validators = self.scope['_form_'+self.name][self.name].$validators;
            self.model.$validators.image = (b64) => self.isImageValid && self.checkImage(b64);

            self.getInputElement().on('change', (e) => e.target.files.length == 0 || self.readFile(e.target.files[0]).then((b64) => self.setImage(b64)));

            self.model.$validate();
        }, 1);
    }

    $onInit(){
        this.model.$render = () => this.setImage(this.model.$viewValue);
        this.util.timeout(()=> this.initialize(), 0);
    }

    $onChanges(){
        this.model.$validate();
    }

    showCamera(){
        this.cameraService.showCamera().then((img) => this.setImage(img));
    }

    getInputElement(){
        return this.scope['_form_'+this.name][this.name].$$element;
    }

    readFile(file){
        var deferred = this.util.defer();
        var reader = new FileReader();
        reader.onload = (e) => deferred.resolve(e.target.result);
        reader.onerror = (e) => deferred.reject(e);
        reader.readAsDataURL(file);
        return deferred.promise;
    }

    clean(){
        this.setImage(null);
    }

    setImage(b64){
        if(this.checkImage(b64)){
            this.isImageValid = true;
            this.value = b64;
            this.model.$setViewValue(b64);
            this.model.$validate();
        }else{
            this.isImageValid = false;
            this.value = null;
            this.model.$setViewValue(null);
        }
        this.model.$validate();
    }

    checkImage(modelValue){
        return (this.b64regex.test(modelValue) || this.urlRegex.test(modelValue) || modelValue == null || modelValue == "");
    }
}

class SearchInputController{

    constructor($scope, OrphaUtilService){
        'ngInject'
        this.scope = $scope;
        this.util = OrphaUtilService;
    }

    initialize(){
        let self = this;

        this.isDisabled = this.isDisabled || false;
        this.isRequired = this.isRequired || false;
        this.maxLength = this.maxLength || null;
        this.minlength = this.minlength || 0;
        this.name = this.name || 'input_'+Math.random().toString(36).slice(2).substr(0, 5);
        this.label = this.label || '';
        this.icon = this.icon || null;

        this.util.timeout(()=> {
            self.form = self.scope['_form_'+self.name];
            self.model.$validators = self.form[this.name].$validators;

            self.validate();
        }, 1);
    }

    $onInit(){
        var self = this;
        this.model.$render = () => this.value = this.model.$viewValue;
        this.util.timeout(()=> this.initialize(), 0);
    }

    $onChange(){
        this.validate();
    }

    clean(){
        this.value = '';
        this.onChange();
    }

    onChange(){
        this.model.$setViewValue(this.value);
        this.validate();
    }

    validate(){
        this.model.$validate();
        this.form[this.name].$validate();
    }
}

export let TextInputComponent = {
    selector:'textInput',
    require: {
        model: "ngModel"
    },
    bindings:{
        isDisabled: '<',
        isRequired: '<',
        maxLength: '<',
        minLength: '<',
        checkMatch: '<',
        checkEmail: '<',
        match: '<',
        name:'@',
        label: '@',
        icon: '@',
        type: '@'
    },
    controller:TextInputController,
    controllerAs:'$ctrl',
    templateUrl: TextInputTemplate,
    transclude:true
};

export let NumberInputComponent = {
    selector:'numberInput',
    require: {
        model: "ngModel"
    },
    bindings:{
        isDisabled: '=',
        isRequired: '=',
        max: '<',
        min: '<',
        name:'@',
        label: '@',
        icon: '@',
    },
    controller:TextInputController,
    controllerAs:'$ctrl',
    templateUrl: NumberInputTemplate,
    transclude:true
};

export let FileInputComponent = {
    selector:'fileInput',
    require: {
        model: "ngModel"
    },
    bindings:{
        isDisabled: '<',
        isRequired: '<',
        preview: '<',
        showButtons: '<',
        name:'@'
    },
    controller: FileInputController,
    controllerAs:'$ctrl',
    templateUrl: FileInputTemplate,
    transclude:true
};

export let SearchInputComponent = {
    selector:'searchInput',
    require: {
        model: "ngModel"
    },
    bindings:{
        isDisabled: '<',
        isRequired: '<',
        maxLength: '<',
        minLength: '<',
        name:'@',
        label: '@'
    },
    controller:SearchInputController,
    controllerAs:'$ctrl',
    templateUrl: SearchInputTemplate,
    transclude:true
};
