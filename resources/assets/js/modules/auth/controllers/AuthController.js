
export default class AuthController {

    constructor(AuthService, $state) {
        'ngInject'
        if (AuthService.isAuthenticated()) {
            //$state.go('orpha');
        }
    }
}