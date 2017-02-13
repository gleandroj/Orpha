/**
 * Created by FG0003 on 08/02/2017.
 */

export default class ProfileController{

    constructor(AuthService, DialogService){
        this.user = AuthService.getCurrentUser();
        this.selectedPage = 'dados';
        this.dialog = DialogService;
    }

    showPasswordDialog(){

    }
}