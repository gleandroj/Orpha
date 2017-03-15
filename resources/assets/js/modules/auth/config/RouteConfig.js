import AuthController from './../controllers/AuthController';
import AuthTemplate from './../pages/auth-layout.tpl.html';

import LoginController from './../controllers/LoginController';
import LoginTemplate from './../pages/login-page.tpl.html';

import PasswordRecoveryController from './../controllers/PasswordRecoveryController';
import PasswordRecoveryTemplate from './../pages/password-recovery.tpl.html';

import PasswordResetController from './../controllers/PasswordResetController';
import PasswordResetTemplate from './../pages/password-reset.tpl.html';

import TokenResolve from './../resolvers/TokenResolve';

export default function RouteConfig($stateProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            abstract: true,
            template: AuthTemplate,
            controller: AuthController,
            allowAnonymous:true
        })
        .state('auth.login', {
            url: '/login',
            controller: LoginController,
            controllerAs: '$ctrl',
            template: LoginTemplate,
            allowAnonymous:true
        })
        .state('auth.password', {
            url: '/password/email',
            controller: PasswordRecoveryController,
            controllerAs: '$ctrl',
            template: PasswordRecoveryTemplate,
            allowAnonymous:true
        })
        .state('auth.password_reset', {
            url: '/password/reset?email&token',
            resolve: {
                Token: TokenResolve
            },
            controller: PasswordResetController,
            controllerAs: '$ctrl',
            template: PasswordResetTemplate,
            allowAnonymous:true
        });
}

RouteConfig.$inject = ['$stateProvider'];