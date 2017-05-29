/**
 * Created by FG0003 on 06/03/2017.
 */

export default function PiaResolve(PiaService, OrphaUtilService, LogService, $stateParams, $state) {
    let deferred = OrphaUtilService.defer();
    PiaService.get($stateParams.id)
        .success((pia) => { deferred.resolve(pia) })
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

PiaResolve.$inject = ['PiaService', 'OrphaUtilService', 'LogService', '$stateParams', '$state'];
