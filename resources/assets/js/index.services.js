/**
 * Created by FG0003 on 27/12/2016.
 */

import LogService from './services/LogService';
import OrphaUtilService from './services/OrphaUtilService';
import StorageService from './services/StorageService';
import MessageService from './services/MessageService';
import { DialogServiceProvider } from './services/DialogService';
import ToastService from './services/ToastService';
import { CameraService, ImageHelperService } from './services/CameraService';
import { SessionService, SessionEvents } from './services/SessionService';
import { AuthServiceProvider } from './services/AuthService';

angular.module('orpha.services')
    .service('LogService', LogService)
    .service('OrphaUtilService', OrphaUtilService)
    .service('StorageService', StorageService)
    .service('MessageService', MessageService)
    .provider('DialogService', DialogServiceProvider)
    .service('ToastService', ToastService)
    .service('CameraService', CameraService)
    .service('ImageHelperService', ImageHelperService)
    .service('SessionService', SessionService)
    .provider('AuthService', AuthServiceProvider);