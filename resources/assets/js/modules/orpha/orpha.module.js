import RouteConfig from './config/RouteConfig';

let module = angular
    .module('orpha.modules.orpha', [])
    .config(RouteConfig);

export default module.name;