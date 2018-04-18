/**
 * Created by FG0003 on 06/03/2017.
 */

export default function InformacoesFamiliaResolve(InformacoesFamiliaService, OrphaUtilService, LogService, $transition$, $state) {
    let deferred = OrphaUtilService.defer();
    InformacoesFamiliaService.get($transition$.params().id)
        .success((informacoesFamilia) => { deferred.resolve(informacoesFamilia) })
        .error((error) => {
            try{
                $state.go('^');
            }catch (err){
                $state.go('crianca.pia.menu');
            }
            deferred.reject(error);
        });
    return deferred.promise;
}

InformacoesFamiliaResolve.$inject = ['InformacoesFamiliaService', 'OrphaUtilService', 'LogService', '$transition$', '$state'];
