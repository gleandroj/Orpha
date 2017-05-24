/**
 * Created by hc on 5/23/17.
 */

export default class DadosNecessidadesController{

    constructor(OrphaUtilService, Scope, State, Crianca, LogService, ToastService){
        this.util = OrphaUtilService;
        this.scope = Scope;
        this.state = State;
        this.crianca = Crianca;
        this.logService = LogService;
        this.toastService = ToastService;
        this.selected = 0;
        this.loading = false;
        this.readOnly = false;
        this.scopes = [];
        this.dadosenecessidades = {
            documentacao_completado:false,
            necessidades_completado:false,
            rededeapoio_completado:false,
            atividades_completado:false,
            tratamentos_completado:false,
            religiosidade_completado:false,
            completado:false
        };
    }

    saveAndNext(){
        this.loading = true;
        this.util.timeout(()=>{
            if(this.selected === 0){
                this.dadosenecessidades.documentacao_completado = true;
            }
            this.loading = false;
            this.selected++;
            console.log(this);
        }, 1500);
    }

    voltar(){
        this.loading = true;
        this.state.go('crianca.pia.menu', {id: this.crianca.id }).then(()=>{}, (error) => this.showError(error));
    }

    finish(){
        if(this.selected === 0){
            this.voltar();
        }
    }

    changeToEditMode(){

    }

    pushScope(scope){
        this.scopes.push(scope);
    }

    canSaveAndNext(){
        return this.scopes[this.selected] && this.scopes[this.selected]['form'] && this.scopes[this.selected]['form'].$valid;
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }
}

DadosNecessidadesController.$inject = ['OrphaUtilService', '$scope', '$state', 'Crianca', 'LogService', 'ToastService'];