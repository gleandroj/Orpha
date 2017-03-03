/**
 * Created by FG0003 on 28/12/2016.
 */

import camDialogTemplate from './../components/camera/camera.tpl.html';

class CameraController {

    constructor(DialogService, OrphaUtilService, LogService, $window, locals) {

        this.window = $window;
        this.dialog = DialogService;
        this.util = OrphaUtilService;
        this.log = LogService;
        this.title = locals.title || 'Camera';
        this.captured = false;
        this.snapshot = '';
        this.dimensions = {
            height: locals.height || 250,
            width: locals.width || 300
        };
        this.loading = true;
        this.error = false;
        this.videoStream = null;

        this.elements = {
            root: null,
            video: null,
            canvas: null
        };

        this.util.timeout(()=> {
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
        this.util.timeout(()=> {
            ctx.drawImage(this.elements.video, 0, 0, this.elements.video.videoWidth, this.elements.video.videoHeight);
            this.snapshot = this.elements.canvas.toDataURL();
            this.captured = true;
        }, 0);
    }

    initialize() {
        this._findElements();
        let self = this;

        if (!this.hasUserMedia()) return this.cancel();

        let onSuccess = (stream)=> {
            self.videoStream = stream;
            if (navigator.mozGetUserMedia) {
                self.elements.video.mozSrcObject = self.videoStream;
            } else {
                let vendorURL = window.URL || window.webkitURL;
                self.elements.video.src = vendorURL.createObjectURL(self.videoStream);
            }
            self.elements.video.addEventListener('loadeddata', ()=> {
                self.util.timeout(()=> {
                    self.dimensions.height = self.elements.video.videoHeight; //Real Height
                    self.dimensions.width = self.elements.video.videoWidth; //Real Width
                    self.loading = false;
                }, 0);
            });
        };

        var onFailure = function (err) {
            self.log.error(err.message);
            if (err.name == 'PermissionDeniedError') {
                self.message = err.message;
            }
            self.error = true;
            self.loading = false;
        };

        this.util.timeout(function () {
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

    _findElements() {
        this.elements.root = this.util.element(document.getElementById('camera-root'))[0];
        this.elements.video = this.util.element(document.getElementById('camera-video'))[0];
        this.elements.canvas = this.util.element(document.getElementById('camera-canvas'))[0];
    }

    stopVideo(){
        if (!this.error) {
            this.videoStream.getVideoTracks()[0].stop();
        }
    }

    salvar() {
        this.stopVideo();
        this.dialog.hideDialog(this.snapshot);
    }

    voltar() {
        this.captured = false;
        this.snapshot = '';
    }

    cancel() {
        this.stopVideo();
        this.dialog.cancelDialog('cancel');
    }
}

CameraController.$inject = ['DialogService', 'OrphaUtilService', 'LogService', '$window', 'locals'];

export default class CameraService {
    constructor(DialogService, OrphaUtilService, LogService) {

        this.log = LogService;
        this.dialogService = DialogService;
        this.util = OrphaUtilService;
    }

    showCamera(options) {
        options = options || {};
        let defer = this.util.defer();
        this.log.info("Camera started.");
        this.dialogService.showCustomDialog({
            controller: CameraController,
            template: camDialogTemplate,
            clickOutsideToClose: false,
            fullscreen: false,
            locals: options
        }).then((response) => {
            defer.resolve(response);
            this.log.info("Camera stopped, reason: save.");
        }, (err) => {
            if (err !== 'cancel') {
                defer.reject(err);
            }
            this.log.info("Camera stopped, reason: " + err + ".");
        });
        return defer.promise;
    }
}

CameraService.$inject = ['DialogService', 'OrphaUtilService', 'LogService'];