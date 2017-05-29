/**
 * Created by hc on 5/23/17.
 */

export default class DadosNecessidadesController{

    constructor(OrphaUtilService, Scope, State, Crianca, DadosNecessidades, DadosNecessidadesService, LogService, ToastService){
        this.util = OrphaUtilService;
        this.scope = Scope;
        this.state = State;
        this.crianca = Crianca;
        this.originalDadosenecessidades = this.util.copy(DadosNecessidades);
        this.dadosenecessidades = DadosNecessidades;
        this.dadosNecessidadesService = DadosNecessidadesService;
        this.logService = LogService;
        this.toastService = ToastService;
        this.selected = 0;
        this.loading = false;
        this.readOnly = this.dadosenecessidades.completado || false;
        this.scopes = [];
    }

    saveAndNext(){
        this.loading = true;
        this.util.timeout(()=>{
            switch (this.selected){
                case 0:
                    this.save('documentacao');
                    break;
                case 1:
                    this.save('necessidades');
                    break;
                case 2:
                    this.save('rededeapoio');
                    break;
                case 3:
                    this.save('atividades');
                    break;
                case 4:
                    this.save('tratamentos');
                    break;
                case 5:
                    this.save('religiosidade');
                    this.finish();
                    break;
                default:
                    break;
            };
            this.loading = false;
            this.selected++;
        }, 1500);
    }

    save(key){
        this.dadosNecessidadesService.save(this.crianca.id, this.util.extend(this.dadosenecessidades, { completado: true }), key)
            .success((dadosenecessidades)=>{
                this.originalDadosenecessidades = this.util.copy(dadosenecessidades);
                this.dadosenecessidades = dadosenecessidades;
                if(this.selected < 5) this.selected++;
            })
            .error((error)=> this.showError(error));
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

    canGoBack(){
        this.util.compare(this.dadosenecessidades, this.originalDadosenecessidades);
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }
}

DadosNecessidadesController.$inject = ['OrphaUtilService', '$scope', '$state', 'Crianca', 'DadosNecessidades', 'DadosNecessidadesService', 'LogService', 'ToastService'];