/**
 * Created by FG0003 on 13/02/2017.
 */


export let CheckEmailDirective = {
    selector:'checkEmail',
    fn: ['$http', 'OrphaUtilService', '$q', ($http, OrphaUtilService, $q)=>{

        return {
            require:{
                model:"ngModel"
            },
            link:(scope, element, attrs, $ctrl)=>{
                let check = function(){ return attrs.check === 'true' && $ctrl.model.$touched && $ctrl.model.$dirty };

                scope.$watch(check, function (val) {
                    $ctrl.model.$validate();
                });

                $ctrl.model.$asyncValidators.checkEmail = function (value) {
                    var defer = OrphaUtilService.defer();

                    if(value != null && value != '' && check()){
                        $http.post('/api/users/checkEmail', {email:value, user_id:attrs.userId})
                            .then((data) => defer.resolve(),
                                (err)=>{
                                    if(err.status == 422)
                                        scope['check_email_result'] = err.data.errors['email'];
                                    defer.reject();
                                });
                    }else{
                        return $q.resolve(true);
                    }
                    return defer.promise;
                };
            }
        }
    }]
};