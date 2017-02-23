/**
 * Created by FG0003 on 08/02/2017.
 */

export default class UserController{

    constructor($state){
        'ngInject'
        this.title = $state.current.title || 'Usuários';
    }
}