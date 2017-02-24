import ProfileController from './../controllers/ProfileController';
import UserController from './../controllers/UserController';
import ListController from './../controllers/ListController';

import ProfileTemplate from './../pages/profile.tpl.html';
import LayoutTemplate from './../pages/layout.tpl.html';
import ListTemplate from './../pages/list.tpl.html';

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function RouteConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('user', {
            parent:'orpha',
            abstract: true,
            url: '/user',
            controller: UserController,
            controllerAs: '$controller',
            template: LayoutTemplate
        })
        .state('user.profile', {
            url: '/profile',
            controller: ProfileController,
            controllerAs: '$controller',
            template: ProfileTemplate
        })
        .state('user.list', {
            url: '/list',
            controller: ListController,
            controllerAs: '$controller',
            template: ListTemplate
        });
}
