/**
 * Created by FG0003 on 07/02/2017.
 *
 * Redirect user to the correct route when him types a wrong URL
 */

export default function RouteAppConfig($urlRouterProvider) {
    'ngInject';
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