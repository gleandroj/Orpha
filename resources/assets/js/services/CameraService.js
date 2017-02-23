/**
 * Created by FG0003 on 28/12/2016.
 */

var camDialogTemplate =
    '<md-dialog aria-label="Camera Dialog" layout="column">'+
    '	<md-toolbar>'+
    '		<div class="md-toolbar-tools">'+
    '			<h2>{{$ctrl.title}}</h2>'+
    '			<span flex></span>'+
    '			<md-button class="md-icon-button" ng-click="$ctrl.cancel()">'+
    '				<md-icon class="material-icons" aria-label="Close dialog">close</md-icon>'+
    '			</md-button>'+
    '		</div>'+
    '	</md-toolbar>'+
    '   <div id="camera-root" layout="column" flex layout-align="start center">' +
    '       <video ng-show="!$ctrl.captured" id="camera-video" autoplay="true" ></video>' +
    '       <canvas ng-show="$ctrl.captured" id="camera-canvas" width="{{$ctrl.dimensions.width + \'px\'}}" height="{{$ctrl.dimensions.height + \'px\'}}"></canvas>' +
    '   </div>'+
    '	<md-divider></md-divider>'+
    '	<md-dialog-actions ng-if="!$ctrl.captured" layout="row" layout-align="end center" >'+
    '		<md-button class="md-raised md-accent" ng-click="$ctrl.takeSnapshot()"  md-auto-focus><md-icon class="material-icons">photo_camera</md-icon><md-tooltip md-direction="top">Capturar</md-tooltip></md-button>'+
    '		<md-button class="md-warn" ng-click="$ctrl.cancel()">Cancelar</md-button>'+
    '	</md-dialog-actions>'+
    '	<md-dialog-actions ng-if="$ctrl.captured" layout="row" layout-align="end center" >'+
    '		<md-button class="md-raised md-accent" ng-click="$ctrl.salvar()" md-auto-focus>Salvar</md-button>'+
    '		<md-button class="md-warn" ng-click="$ctrl.voltar()">Voltar</md-button>'+
    '	</md-dialog-actions>'+
    '</md-dialog>';


class CameraController{

    constructor(DialogService, OrphaUtilService, LogService, $window, locals){
        'ngInject'

        this.window = $window;
        this.dialog = DialogService;
        this.util = OrphaUtilService;
        this.log = LogService;
        this.title = locals.title || 'Camera';
        this.captured = false;
        this.snapshot = '';
        this.dimensions = {
            height:locals.height || 0,
            width:locals.width || 0
        };
        this.loading = true;

        this.videoStream = null;

        this.elements = {
            root: null,
            video:null,
            canvas:null
        };

        this.util.timeout(()=>{
            this.initialize();
        }, 0);
    }

    getUserMedia() {
        navigator.getUserMedia = (this.window.navigator.getUserMedia ||
        this.window.navigator.webkitGetUserMedia ||
        this.window.navigator.mozGetUserMedia ||
        this.window.navigator.msGetUserMedia);
        return navigator.getUserMedia;
    }

    hasUserMedia() {
        return !!this.getUserMedia();
    }

    takeSnapshot() {
        var ctx = this.elements.canvas.getContext('2d');
        this.util.timeout(()=>{
            ctx.drawImage(this.elements.video, 0, 0, this.elements.video.videoWidth, this.elements.video.videoHeight);
            this.snapshot = this.elements.canvas.toDataURL();
            this.captured = true;
        }, 0);
    }

    initialize(){
        this._findElements();
        let self = this;

        if(this.dimensions.width == 0){
            this.dimensions.width = this.elements.root.parentElement.clientWidth;
        }

        if(this.dimensions.height == 0 ){
            this.dimensions.height = this.elements.root.parentElement.clientHeight;
        }

        if (!this.hasUserMedia()) return this.cancel();

        let onSuccess = (stream)=>{
            self.videoStream = stream;
            if (navigator.mozGetUserMedia) {
                self.elements.video.mozSrcObject = self.videoStream;
            } else {
                let vendorURL = window.URL || window.webkitURL;
                self.elements.video.src = vendorURL.createObjectURL(self.videoStream);
            }
            self.elements.video.addEventListener('loadeddata', ()=>{
                self.util.timeout(()=>{
                    self.dimensions.height = self.elements.video.videoHeight; //Real Height
                    self.dimensions.width = self.elements.video.videoWidth; //Real Width
                    self.loading = false;
                }, 0);
            });
        };

        var onFailure = function(err) {
            self.log.error(err);
        };

        this.util.timeout(function() {
            navigator.getUserMedia({
                video: {
                    mandatory: {
                        maxWidth: self.dimensions.width,
                        maxHeight: self.dimensions.height
                    }
                },
                audio: false
            }, onSuccess, onFailure);
        }, 0);
    }

    _findElements(){
        this.elements.root = this.util.element(document.getElementById('camera-root'))[0];
        this.elements.video = this.util.element(this.elements.root.firstElementChild)[0];
        this.elements.canvas = this.util.element(this.elements.root.lastElementChild)[0];
    }

    salvar(){
        this.videoStream.getVideoTracks()[0].stop();
        this.dialog.hideDialog(this.snapshot);
    }

    voltar(){
        this.captured = false;
        this.snapshot = '';
    }

    cancel(){
        this.videoStream.getVideoTracks()[0].stop();
        this.dialog.cancelDialog('cancel');
    }
}

export default class CameraService{
    constructor(DialogService, OrphaUtilService, LogService){
        'ngInject'

        this.log = LogService;
        this.dialogService = DialogService;
        this.util = OrphaUtilService;
    }

    showCamera(options){
        options = options || {};
        let defer = this.util.defer();
        this.log.info("Camera started.");
        this.dialogService.showCustomDialog({
            controller: CameraController,
            template: camDialogTemplate,
            clickOutsideToClose:false,
            fullscreen: false,
            locals:options
        }).then((response) => {
            defer.resolve(response);
            this.log.info("Camera stopped, reason: save.");
        }, (err) => {
            if(err !== 'cancel'){
                defer.reject(err);
            }
            this.log.info("Camera stopped, reason: " + err+".");
        });
        return defer.promise;
    }
}