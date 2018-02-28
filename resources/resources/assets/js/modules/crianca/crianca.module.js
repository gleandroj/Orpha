/**
 * Created by FG0003 on 21/02/2017.
 */

import RouteConfig from './config/RouteConfig';
import CriancaService from './services/CriancaService';

import { CriancaListComponent } from './components/CriancaListComponent/CriancaListComponent';
import { CriancaFormComponent } from './components/CriancaFormComponent/CriancaFormComponent';

let module = angular
    .module('orpha.modules.crianca', [])
    .component(CriancaListComponent.selector, CriancaListComponent)
    .component(CriancaFormComponent.selector, CriancaFormComponent)
    .service('CriancaService', CriancaService)
    .config(RouteConfig);

export default module.name;