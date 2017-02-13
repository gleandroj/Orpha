import ProfileController from './../controllers/ProfileController';
import UserController from './../controllers/UserController';
import ListController from './../controllers/ListController';

import ProfileTemplate from './../pages/profile.tpl.html';
import LayoutTemplate from './../pages/layout.tpl.html';
import ListTemplate from './../pages/list.tpl.html';

export default function RouteConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('user', {
            parent:'orpha',
            abstract: true,
            url: '/user',
            controller: UserController,
            controllerAs: '$controller',
            templateUrl: LayoutTemplate
        })
        .state('user.profile', {
            url: '/profile',
            controller: ProfileController,
            controllerAs: '$controller',
            templateUrl: ProfileTemplate
        })
        .state('user.list', {
            url: '/list',
            controller: ListController,
            controllerAs: '$controller',
            templateUrl: ListTemplate
        });
}