/**
 * Created by hc on 5/23/17.
 */

export default class AtividadesSocioeducativasController{

    constructor(OrphaUtilService, Scope, State, Crianca, AtividadesSocioeducativas, AtividadesSocioeducativasService, LogService, ToastService, MessageService, DialogService){
        this.util = OrphaUtilService;
        this.scope = Scope;
        this.state = State;
        this.crianca = Crianca;
        this.originalDadosenecessidades = this.util.copy(AtividadesSocioeducativas);
        this.atividadessocioeducativas = AtividadesSocioeducativas;
        this.atividadesSocioeducativasService = AtividadesSocioeducativasService;
        this.logService = LogService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.dialogService = DialogService;
        this.scopes = [];
        this.selected = 0;
        this.loading = false;
        this.readOnly = this.atividadessocioeducativas.educacaoecidadania_completado;
    }

    get isReadOnly(){
        return this.readOnly;
    }

    get tabKey(){
        switch (this.selected){
            case 0:
                return 'educacao_cidadania';
                break;
            case 1:
                return 'educacao_meio_ambiente';
                break;
            case 2:
                return 'educacao_saude';
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
        this.atividadesSocioeducativasService
            .save(this.crianca.id, this.atividadessocioeducativas, key)
            .success((atividadessocioeducativas)=>{
                this.util.extend(this.originalDadosenecessidades, atividadessocioeducativas);
                this.util.extend(this.atividadessocioeducativas, atividadessocioeducativas);
                this.toastService.showSuccess(this.messageService.get(this.editMode ? 'MSG7' : 'MSG5'));

                if(this.tabKey !== 'educacaoesaude'){
                    this.selected++;
                    this.loading = false;
                }
                else this.back();
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

AtividadesSocioeducativasController.$inject = ['OrphaUtilService', '$scope', '$state', 'Crianca', 'AtividadesSocioeducativas', 'AtividadesSocioeducativasService', 'LogService', 'ToastService', 'MessageService', 'DialogService'];