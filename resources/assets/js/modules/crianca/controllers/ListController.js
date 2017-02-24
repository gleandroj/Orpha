/**
 * Created by FG0003 on 09/02/2017.
 */
import FallbackImg from './../../../../img/ic_account_circle_black_48dp_2x.png';
/*import CriancaDialogController from './CriancaDialogController';
 import CriancaDialogTemplate from './../pages/dialog.tpl.html';*/

export default class ListController {

    constructor(DialogService, OrphaUtilService, AuthService, CriancaService, ToastService, MessageService) {

        this.authService = AuthService;
        this.util = OrphaUtilService;
        this.dialogService = DialogService;
        this.criancaService = CriancaService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.fallbackImg = FallbackImg;
        this.criancas = [];
        this.search = '';
        this.loading = true;
        this.enabledCriancasCurrentPage = this.disabledCriancasCurrentPage = 1;
        this.enabledCriancasItemsPerPage = this.disabledCriancasItemsPerPage = 5;
        this.getAll();
    }

    getAll() {
        this.loading = true;
        this.criancaService.getAll().success((criancas) => {
            this.loading = false;
            this.criancas = criancas;
        })
            .error((error) => {
                console.log(error);
                this.loading = false;
                this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
            });
    }

    showCrianca(crianca) {
        this.showDialog(crianca, 'Visualizar Criança', true)
            .then((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
                this.toastService.showSuccess(this.messageService.get('MSG7'));
            }, (err)=> {});
    }

    editCrianca(crianca) {
        this.showDialog(crianca, 'Alterar Criança', false)
            .then((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
                this.toastService.showSuccess(this.messageService.get('MSG7'));
            }, (err)=> {});
    }

    createCrianca() {
        this.showDialog({}, 'Inserir Criança', false)
            .then((newCrianca)=> {
                this.criancas.push(newCrianca);
                this.toastService.showSuccess(this.messageService.get('MSG5'));
            }, (err) => {});
    }

    disableCrianca(crianca) {
        this.criancaService.disable(crianca)
            .then((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
            }, ()=> {});
    }

    enableCrianca(crianca) {
        this.criancaService.enable(crianca)
            .then((newCrianca)=> {
                this.util.extend(crianca, newCrianca);
            }, ()=> {});
    }

    showDialog(crianca, title, readOnly) {
        /*return this.dialogService.showCustomDialog({
         controller: CriancaDialogController,
         templateUrl: CriancaDialogTemplate,
         locals: {
         title: title,
         crianca: this.util.copy(crianca),
         readOnly: readOnly
         }
         });*/
    }
}

ListController.$inject = ['DialogService', 'OrphaUtilService', 'AuthService', 'CriancaService', 'ToastService', 'MessageService'];