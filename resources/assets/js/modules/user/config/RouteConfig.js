
import UserController from './../controllers/UserController';
import LayoutTemplate from './../pages/layout.tpl.html';

import ListController from './../controllers/ListController';
import ListTemplate from './../pages/list.tpl.html';

import ProfileController from './../controllers/ProfileController';
import ProfileTemplate from './../pages/profile.tpl.html';

import FormController from './../controllers/FormController';
import FormTemplate from './../pages/form.tpl.html';

import UserResolver from './../resolvers/UserResolve';

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
        })
        .state('user.create', {
            url: '/create',
            resolve: {
                User: ()=>{ return {}; },
            },
            data:{
                EditMode: true,
                Title: 'Cadastrar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate
        })
        .state('user.show', {
            url: '/:id',
            resolve: {
                User: UserResolver
            },
            data:{
                EditMode: false,
                Title: 'Visualizar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate
        })
        .state('user.edit', {
            url: '/:id/edit',
            resolve: {
                User: UserResolver
            },
            data:{
                EditMode: true,
                Title: 'Alterar usuário'
            },
            controller: FormController,
            controllerAs: '$controller',
            template: FormTemplate
        })
}
