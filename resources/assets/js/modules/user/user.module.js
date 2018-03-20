import RouteConfig from './config/RouteConfig';
import UserService from './services/UserService';

import { SimpleUserCardComponent } from './components/SimpleUserCardComponent/SimpleUserCardComponent';
import { UserPermissionsCardComponent } from './components/UserPermissionsCardComponent/UserPermissionsCardComponent';
import { UserListComponent } from './components/UserListComponent/UserListComponent';
import { UserFormComponent } from './components/UserFormComponent/UserFormComponent';

let module = angular
    .module('orpha.modules.user', [])
    .component(SimpleUserCardComponent.selector, SimpleUserCardComponent)
    .component(UserPermissionsCardComponent.selector, UserPermissionsCardComponent)
    .component(UserListComponent.selector, UserListComponent)
    .component(UserFormComponent.selector, UserFormComponent)
    .service('UserService', UserService)
    .config(RouteConfig);

export default module.name;