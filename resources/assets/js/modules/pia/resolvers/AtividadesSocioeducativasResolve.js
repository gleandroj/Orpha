/**
 * Created by FG0003 on 06/03/2017.
 */

export default function AtividadesSocioeducativasResolver(AtividadesSocioeducativasService, OrphaUtilService, LogService, $transition$, $state) {
    let deferred = OrphaUtilService.defer();
    AtividadesSocioeducativasService.get($transition$.params().id)
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

AtividadesSocioeducativasResolver.$inject = ['AtividadesSocioeducativasService', 'OrphaUtilService', 'LogService', '$transition$', '$state'];
