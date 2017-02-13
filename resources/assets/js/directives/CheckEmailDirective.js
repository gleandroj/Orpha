/**
 * Created by FG0003 on 13/02/2017.
 */


export let CheckEmailDirective = {
    selector:'checkEmail',
    fn: ($http, OrphaUtilService)=>{
        return {
            require:{
                model:"ngModel"
            },
            link:(scope, element, attrs, $ctrl)=>{
                let check = function(){return attrs.check === 'true'};
                $ctrl.model.$asyncValidators.checkEmail = function (value) {
                    var defer = OrphaUtilService.defer();

                    if(value != null && value != '' && check()){
                        $http.post('/api/users/checkEmail', {email:value, user_id:attrs.userId})
                            .then((data) => defer.resolve(),
                                (err)=>{
                                    scope['check_email_result'] = err.data['email'][0];
                                    defer.reject();
                                });
                    }else{
                        OrphaUtilService.timeout(() => defer.resolve(), 1);
                    }
                    return defer.promise;
                };
            }
        }
    }
};