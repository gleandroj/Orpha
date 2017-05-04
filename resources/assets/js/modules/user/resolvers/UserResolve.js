/**
 * Created by FG0003 on 14/03/2017.
 */
/**
 * Created by FG0003 on 06/03/2017.
 */

export default function UserResolve(UserService, OrphaUtilService, LogService, $stateParams, $state) {
    let deferred = OrphaUtilService.defer();
    UserService.get($stateParams.id)
        .success((user) => { deferred.resolve(user) })
        .error((error) => {
            $state.go('user.list');
            deferred.reject(error);
        });

    return deferred.promise;
}

UserResolve.$inject = ['UserService', 'OrphaUtilService', 'LogService', '$stateParams', '$state'];
