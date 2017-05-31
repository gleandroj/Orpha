/**
 * Created by FG0003 on 21/02/2017.
 */

import RouteConfig from './config/RouteConfig';
import PiaService from './services/PiaService';
import DadosNecessidadesService from './services/DadosNecessidadesService';
import AtividadesSocioeducativasService from './services/AtividadesSocioeducativasService';

let module = angular
    .module('orpha.modules.pia', [])
    .service('DadosNecessidadesService', DadosNecessidadesService)
    .service('AtividadesSocioeducativasService', AtividadesSocioeducativasService)
    .service('PiaService', PiaService)
    .config(RouteConfig);

export default module.name;