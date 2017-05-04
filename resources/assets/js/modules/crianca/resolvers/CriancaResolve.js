/**
 * Created by FG0003 on 06/03/2017.
 */

export default function CriancaResolve(CriancaService, OrphaUtilService, LogService, $stateParams, $state) {
    let deferred = OrphaUtilService.defer();
    CriancaService.get($stateParams.id)
        .success((crianca) => { deferred.resolve(crianca) })
        .error((error) => {
            $state.go('crianca.list');
            deferred.reject(error);
        });

    return deferred.promise;
}

CriancaResolve.$inject = ['CriancaService', 'OrphaUtilService', 'LogService', '$stateParams', '$state'];
