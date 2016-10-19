/**
 * Created by marcosnqs on 27/09/2016.
 */

angular.module('orpha.routes', ['ui.router']);
angular.module('orpha.components', ['ngMaterial', 'ui.router', 'ngMessages', 'ngMask']);
angular.module('orpha.services', ['ngResource', 'ngMaterial']);
angular.module('orpha.directives', ['ngMaterial']);
angular.module('orpha.config', ['ngMaterial']);

angular.module('orpha', [
    'orpha.config',
    'orpha.services',
    'orpha.directives',
    'orpha.components',
    'orpha.routes'
]);
