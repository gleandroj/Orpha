/**
 * Created by hc on 5/29/17.
 */

export default function PiaResolve(PiaService, OrphaUtilService, $state, $transition$) {
    let deferred = OrphaUtilService.defer();
    PiaService.get($transition$.params().id)
        .success((pia) => deferred.resolve(pia))
        .error((error) => {
            try{
                $state.go('^');
            }catch (err){
                $state.go('crianca.list');
            }
            deferred.reject(error);
        });
    return deferred.promise;
}

PiaResolve.$inject = ['PiaService', 'OrphaUtilService', '$state', '$transition$'];