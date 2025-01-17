/**
 * Created by FG0003 on 27/12/2016.
 */
import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import '@uirouter/angularjs';
import 'angular-messages';
import 'angular-filter';
import 'angular-material-expansion-panel';
import 'ng-mask/dist/ngMask.js';
import 'chart.js';
import 'angular-chart.js';
import 'angular-breadcrumb';

import 'angular-material/angular-material.css';
import 'angular-material-simple-components';
import 'angular-material-expansion-panel/dist/md-expansion-panel.min.css';

//import './../css/animations.scss';
import './../css/style.scss';

import AuthModule from './modules/auth/auth.module';
import OrphaModule from './modules/orpha/orpha.module';
import UserModule from './modules/user/user.module';
import CriancaModule from './modules/crianca/crianca.module';
import PiaModule from './modules/pia/pia.module';

angular.module('orpha.run', ['ngMaterial', 'ui.router']);
angular.module('orpha.config', ['ngMaterial', 'ui.router']);
angular.module('orpha.filters', []);
angular.module('orpha.services', ['ngMaterial']);
angular.module('orpha.components', ['ngMaterial', 'ngMessages', 'orpha.filters']);
angular.module('orpha.directives', ['ngMaterial', 'ngMessages']);

angular.module('orpha.modules', [
    'ngMaterial',
    'ui.router',
    'angular-material-simple-components',
    'material.components.expansionPanels',
    'ngMask',
    'chart.js',
    'angular.filter',
    'ncy-angular-breadcrumb',
    AuthModule,
    OrphaModule,
    UserModule,
    CriancaModule,
    PiaModule
]);

angular.module('orpha', [
    'orpha.directives',
    'orpha.components',
    'orpha.services',
    'orpha.filters',
    'orpha.modules',
    'orpha.config',
    'orpha.run'
]);
