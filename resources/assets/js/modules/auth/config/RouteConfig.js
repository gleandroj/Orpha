import AuthController from './../controllers/AuthController';
import AuthTemplate from './../pages/auth-layout.tpl.html';

import LoginController from './../controllers/LoginController';
import LoginTemplate from './../pages/login-page.tpl.html';

import PasswordRecoveryController from './../controllers/PasswordRecoveryController';
import PasswordRecoveryTemplate from './../pages/password-recovery.tpl.html';

import PasswordResetController from './../controllers/PasswordResetController';
import PasswordResetTemplate from './../pages/password-reset.tpl.html';

export default function RouteConfig($stateProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            abstract: true,
            templateUrl: AuthTemplate,
            controller: AuthController,
            allowAnonymous:true
        })
        .state('auth.login', {
            url: '/login',
            controller: LoginController,
            controllerAs: '$ctrl',
            templateUrl: LoginTemplate,
            allowAnonymous:true
        })
        .state('auth.password', {
            url: '/password',
            controller: PasswordRecoveryController,
            controllerAs: '$ctrl',
            templateUrl: PasswordRecoveryTemplate,
            allowAnonymous:true
        })
        .state('auth.password_reset', {
            url: '/password/reset/:token',
            resolve: {
                token: (AuthService, OrphaUtilService, LogService, $stateParams, $state) => {

                    let deferred = OrphaUtilService.defer();

                    AuthService.checkResetPasswordToken($stateParams.token)
                        .success((token) => { deferred.resolve(token) })
                        .error((error) => {
                            //deferred.reject(error['message']);
                            $state.go('auth.login');
                            LogService.error(error['errors'] ? error['errors']['token'] : error['message']);
                        });

                    return deferred.promise;
                }
            },
            controller: PasswordResetController,
            controllerAs: '$ctrl',
            templateUrl: PasswordResetTemplate,
            allowAnonymous:true
        });
}