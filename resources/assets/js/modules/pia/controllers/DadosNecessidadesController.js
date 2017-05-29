/**
 * Created by hc on 5/23/17.
 */

export default class DadosNecessidadesController{

    constructor(OrphaUtilService, Scope, State, Crianca, DadosNecessidadesService, LogService, ToastService){
        this.util = OrphaUtilService;
        this.scope = Scope;
        this.state = State;
        this.crianca = Crianca;
        this.dadosNecessidadesService = DadosNecessidadesService;
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
            switch (this.selected){
                case 0:
                    this.dadosenecessidades.documentacao_completado = true;
                    break;
                case 1:
                    this.dadosenecessidades.necessidades_completado = true;
                    break;
                case 2:
                    this.dadosenecessidades.rededeapoio_completado = true;
                    break;
                case 3:
                    this.dadosenecessidades.atividades_completado = true;
                    break;
                case 4:
                    this.dadosenecessidades.tratamentos_completado = true;
                    break;
                case 5:
                    this.dadosenecessidades.religiosidade_completado = true;
                    this.dadosenecessidades.completado = true;
                    this.dadosNecessidadesService.save(this.crianca.id, this.dadosenecessidades);
                    this.finish();
                    break;
                default:
                    break;
            };
            this.loading = false;
            this.selected++;
        }, 1500);
    }

    back(){
        this.loading = true;
        this.state.go('crianca.pia.menu', {id: this.crianca.id }).then(()=>{}, (error) => this.showError(error));
    }

    prev(){
        if(this.selected === 0 && this.readOnly){
            this.back();
        }else if(!this.readOnly){
            this.finish();
        }else{
            this.selected--;
        }
    }

    finish(){
        this.readOnly = true;
    }

    changeToEditMode(){
        this.readOnly = false;
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

DadosNecessidadesController.$inject = ['OrphaUtilService', '$scope', '$state', 'Crianca', 'DadosNecessidadesService', 'LogService', 'ToastService'];