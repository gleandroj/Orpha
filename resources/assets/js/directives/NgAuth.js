import { AuthEvents } from './../services/AuthService';

function compile(user, element, authorized){
    if(user == null || !user.hasPermission(authorized)){
        element.addClass("ng-hide");
    }else{
        element.removeClass("ng-hide");
    }
}

export let NgAuth = {
    selector: 'ngAuth',
    priority:9999,
    fn: ['AuthService', 'OrphaUtilService', (AuthService, OrphaUtilService)=> {
        return {
            scope: {
                authorized: '=ngAuth'
            },
            link: (scope, element, attrs)=> {
                if(scope.authorized === undefined) return;

                OrphaUtilService.on(AuthEvents.currentUserUpdated, (event, args) => {
                    compile(args.user, element, scope.authorized);
                });

                compile(AuthService.getCurrentUser(), element, scope.authorized);
            }
        }
    }]
};