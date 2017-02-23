/**
 * Created by FG0003 on 27/12/2016.
 */
import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-filter';
import 'angular-material-expansion-panel';
import 'ng-mask/dist/ngMask.js';

import '!style!css!angular-material/angular-material.css';
import '!style!css!angular-material-expansion-panel/dist/md-expansion-panel.min.css';
import '!style!css!sass!./../css/animations.scss';
import '!style!css!sass!./../css/style.scss';

import AuthModule from './modules/auth/auth.module';
import OrphaModule from './modules/orpha/orpha.module';
import UserModule from './modules/user/user.module';
import CriancaModule from './modules/crianca/crianca.module';

angular.module('orpha.run', ['ngMaterial', 'ui.router']);
angular.module('orpha.config', ['ngMaterial', 'ui.router']);
angular.module('orpha.filters', []);
angular.module('orpha.services', ['ngMaterial']);
angular.module('orpha.components', ['ngMaterial', 'ngMessages', 'orpha.filters']);
angular.module('orpha.directives', ['ngMaterial', 'ngMessages']);
angular.module('orpha.modules', [
    'material.components.expansionPanels',
    'angular.filter',
    'ngMaterial',
    'ui.router',
    'ngMask',
    AuthModule,
    OrphaModule,
    UserModule,
    CriancaModule
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
