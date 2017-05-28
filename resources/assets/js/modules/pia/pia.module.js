/**
 * Created by FG0003 on 21/02/2017.
 */

import RouteConfig from './config/RouteConfig';
import PiaService from './services/PiaService';

let module = angular
    .module('orpha.modules.pia', [])
    .service('PiaService', PiaService)
    .config(RouteConfig);

export default module.name;