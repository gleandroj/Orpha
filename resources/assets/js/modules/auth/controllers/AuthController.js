
export default class AuthController {

    constructor(AuthService, $state) {
        if (AuthService.isAuthenticated()) {
            //$state.go('orpha');
        }
    }
}