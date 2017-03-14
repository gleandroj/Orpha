/**
 * Created by FG0003 on 06/03/2017.
 */

export default function TokenResolve(AuthService, OrphaUtilService, LogService, $stateParams, $state) {
    let deferred = OrphaUtilService.defer();
    AuthService.checkResetPasswordToken({email:$stateParams.email, token:$stateParams.token})
        .success((token) => { deferred.resolve(token) })
        .error((error) => {
            $state.go('auth.login');
            LogService.error(error['message']);
        });

    return deferred.promise;
}

TokenResolve.$inject = ['AuthService', 'OrphaUtilService', 'LogService', '$stateParams', '$state'];
