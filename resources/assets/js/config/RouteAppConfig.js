/**
 * Created by FG0003 on 07/02/2017.
 *
 * Redirect user to the correct route when him types a wrong URL
 */

import breadCrumbTemplate from './../components/Breadcrumb/breadcrumb.tpl.html';

RouteAppConfig.$inject = ['$urlRouterProvider', '$breadcrumbProvider'];

export default function RouteAppConfig($urlRouterProvider, $breadcrumbProvider) {

    $breadcrumbProvider.setOptions({
        template: breadCrumbTemplate
    });

    //Disabel Error Handler
    $urlRouterProvider._router.stateService.defaultErrorHandler(function(){});

    //$urlRouterProvider.otherwise('/orpha');
    let defaultRoute = 'user.profile';

    $urlRouterProvider.otherwise(function($injector, $location){
        let Auth = $injector.get('AuthService');
        let $state = $injector.get('$state');

        if(Auth.isAuthenticated()){
            $state.go(defaultRoute);
        }else{
            $state.go(Auth.OAuth.login_route);
        }
    });
}
