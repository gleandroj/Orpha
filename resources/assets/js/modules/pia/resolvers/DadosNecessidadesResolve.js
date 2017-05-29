/**
 * Created by FG0003 on 06/03/2017.
 */

export default function DadosNecessidadesResolve(DadosNecessidadesService, OrphaUtilService, LogService, $stateParams, $state) {
    let deferred = OrphaUtilService.defer();
    DadosNecessidadesService.get($stateParams.id)
        .success((dadosNecessidades) => { deferred.resolve(dadosNecessidades) })
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

DadosNecessidadesResolve.$inject = ['DadosNecessidadesService', 'OrphaUtilService', 'LogService', '$stateParams', '$state'];
