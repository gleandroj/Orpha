import { AuthEvents } from './../services/AuthService';

export let NgAuth = {
    selector: 'ngAuth',
    fn: ['AuthService', 'OrphaUtilService', (AuthService, OrphaUtilService)=> {
        return {
            scope: {
                authorized: '=ngAuth'
            },
            link: (scope, element, attrs)=> {
                if(scope.authorized === undefined) return;
                var removed = false;

                function compile(user){
                    if(user == null || !user.hasPermission(scope.authorized)){
                        if(!removed){
                            element.addClass("ng-hide");
                            removed = true;
                        }
                    }else{
                        if(removed){
                            element.removeClass("ng-hide");
                            removed = false;
                        }
                    }
                }
                OrphaUtilService.on(AuthEvents.currentUserUpdated, (event, args) => compile(args.user));
                OrphaUtilService.timeout(()=> compile(AuthService.getCurrentUser()), 10);
            }
        }
    }]
};