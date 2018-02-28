/**
 * Created by FG0003 on 06/03/2017.
 */

export default function CriancaResolve(CriancaService, OrphaUtilService, LogService, $transition$, $state) {
    let deferred = OrphaUtilService.defer();

    CriancaService.get($transition$.params().id)
        .success((crianca) => { deferred.resolve(crianca) })
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

CriancaResolve.$inject = ['CriancaService', 'OrphaUtilService', 'LogService', '$transition$', '$state'];
