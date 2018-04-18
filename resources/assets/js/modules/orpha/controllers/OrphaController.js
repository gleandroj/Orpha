
export default class OrphaController {

    constructor($mdSidenav, $state, AuthService, OrphaUtilService) {

        this.auth = AuthService;
        this.state = $state;
        this.util = OrphaUtilService;
        this.sidenav = $mdSidenav;

        this.menus = [
            {
                title: 'Dashboard',
                state: 'orpha.dashboard',
                icon: 'dashboard'
            },
            {
                title: 'Usuários',
                state: 'user.list',
                permission: "list-user",
                icon: 'person_identify'
            },
            {
                title: 'Criança / Adolescente',
                state: 'crianca.list',
                permission: "list-crianca",
                icon: 'face'
            }
        ];
    }

    toggle() {
        this.sidenav('left').toggle();
    }

    logout() {
        this.auth.logout();
        //this.state.go('auth.login');
    }
}

OrphaController.$inject = ['$mdSidenav', '$state', 'AuthService', 'OrphaUtilService'];