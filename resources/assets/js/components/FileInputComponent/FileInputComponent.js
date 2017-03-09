/**
 * Created by FG0003 on 29/12/2016.
 */

import AbstractInputComponent from './../AbstractInputComponent/AbstractInputController'
import FileInputTemplate from './file-input.tpl.html';
import FallbackImg from './../../../img/ic_account_circle_black_48dp_2x.png';

class FileInputController extends AbstractInputComponent {

    constructor($scope, OrphaUtilService, CameraService, ImageHelperService) {
        super($scope, OrphaUtilService);

        this.cameraService = CameraService;
        this.imageHelper = ImageHelperService;
        this.fallbackImg = FallbackImg;
        this.b64regex = new RegExp(/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/);
        this.urlRegex = new RegExp(/(http(s?):)|([\/|.|\w|\s])*\.(?:jpeg|png|jpg|gif|bmp)/);
    }

    initialize() {
        super.initialize();

        this.preview = this.preview || false;
        this.showButtons = this.showButtons || false;
    }

    setupValidation() {
        super.setupValidation();

        this.model.$validators = this.scope['_form_' + this.name][this.name].$validators;
        this.model.$validators.image = (b64) => this.isImageValid && this.checkImage(b64);

        this.getInputElement()
            .on('change',
                (e) => e.target.files.length == 0 ||
                    this.imageHelper.fileToDataURL(e.target.files[0])
                        .then((b64) =>
                                this.resize(b64, (newB64)=> this.value = newB64) ));

        this.validate();
    }

    set value(b64) {
        if (this.checkImage(b64)) {
            this.isImageValid = true;
            this.model.$setViewValue(this._value = b64);
        } else {
            this.isImageValid = false;
            this._value = null;
            this.model.$setViewValue(null);
        }
        this.validate();
    }

    get value() {
        return this._value;
    }

    resize(b64, callback) {
        this.imageHelper.createImage(b64, (image) => callback(this.imageHelper.resizeImage(image, { quality: 1 })) );
    }

    showCamera() {
        this.cameraService.showCamera().then((img) => this.value = img);
    }

    getInputElement() {
        return this.form[this.name].$$element;
    }

    clean() {
        this.value = null;
    }

    checkImage(modelValue) {
        return (this.b64regex.test(modelValue) || this.urlRegex.test(modelValue) || modelValue == null || modelValue == "");
    }
}

FileInputController.$inject = ['$scope', 'OrphaUtilService', 'CameraService', 'ImageHelperService'];

export let FileInputComponent = {
    selector: 'fileInput',
    require: {
        model: "ngModel"
    },
    bindings: {
        isDisabled: '<',
        isRequired: '<',
        preview: '<',
        showButtons: '<',
        name: '@'
    },
    controller: FileInputController,
    controllerAs: '$component',
    template: FileInputTemplate,
    transclude: true
};
