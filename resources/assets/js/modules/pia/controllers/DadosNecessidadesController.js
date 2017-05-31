/**
 * Created by hc on 5/23/17.
 */

export default class DadosNecessidadesController{

    constructor(OrphaUtilService, Scope, State, Crianca, DadosNecessidades, DadosNecessidadesService, LogService, ToastService, MessageService, DialogService){
        this.util = OrphaUtilService;
        this.scope = Scope;
        this.state = State;
        this.crianca = Crianca;
        this.originalDadosenecessidades = this.util.copy(DadosNecessidades);
        this.dadosenecessidades = DadosNecessidades;
        this.dadosNecessidadesService = DadosNecessidadesService;
        this.logService = LogService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.dialogService = DialogService;
        this.scopes = [];
        this.selected = 0;
        this.loading = false;
        this.readOnly = this.dadosenecessidades.documentacao_completado;
    }

    get isReadOnly(){
        return this.readOnly;
    }

    get tabKey(){
        switch (this.selected){
            case 0:
                return 'documentacao';
                break;
            case 1:
                return 'necessidades';
                break;
            case 2:
                return 'rededeapoio';
                break;
            case 3:
                return 'atividades';
                break;
            case 4:
                return 'tratamentos';
                break;
            case 5:
                return 'religiosidade';
                break;
            default:
                return null;
                break;
        }
    }

    saveAndNext(){
        this.save(this.tabKey);
    }

    save(key){
        if (!this.editMode) {
            this.submit(key);
        } else {
            this.showConfirmation(()=>{
                this.submit(key);
            }, ()=>{});
        }
    }

    submit(key){
        this.loading = true;
        this.dadosNecessidadesService.save(this.crianca.id, this.util.extend(this.dadosenecessidades, { completado: true }), key)
            .success((dadosenecessidades)=>{
                this.util.extend(this.originalDadosenecessidades, dadosenecessidades);
                this.util.extend(this.dadosenecessidades, dadosenecessidades);
                this.toastService.showSuccess(this.messageService.get(this.editMode ? 'MSG7' : 'MSG5'));

                if(this.tabKey !== 'religiosidade') this.selected++;
                else this.back();
                this.loading = false;
            })
            .error((error)=> this.showError(error));
    }

    back(){
        this.loading = true;
        this.state.go('crianca.pia.menu', {id: this.crianca.id }).then(()=>{}, (error) => this.showError(error));
    }

    prev(){
        this.back();
    }

    changeToEditMode(){
        this.editMode = true;
        this.readOnly = false;
    }

    pushScope(scope){
        this.scopes.push(scope);
    }

    get canSaveAndNext(){
        return this.scopes[this.selected] && this.scopes[this.selected]['form'] && this.scopes[this.selected]['form'].$valid;
    }

    showConfirmation(okCallback, cancelCallback){
        this.dialogService
            .showConfirmDialog({
                title: 'Confirmação',
                okBtn: 'Sim',
                cancelBtn: 'Não',
                message: this.messageService.get('MSG6')
            }).then(okCallback, cancelCallback);
    }

    showError(error){
        this.loading = false;
        let err = (error && error.detail) ? error.detail : error;
        this.logService.error(err && err.error ? err.error  +": "+err['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(err && err.error ? err['message'] : this.messageService.get('MSG4'));
    }
}

DadosNecessidadesController.$inject = ['OrphaUtilService', '$scope', '$state', 'Crianca', 'DadosNecessidades', 'DadosNecessidadesService', 'LogService', 'ToastService', 'MessageService', 'DialogService'];