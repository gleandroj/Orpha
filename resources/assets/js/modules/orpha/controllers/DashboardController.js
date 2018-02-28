/**
 * Created by FG0003 on 17/03/2017.
 */

export default class DashboardController{
    constructor($http, LogService, ToastService, MessageService, OrphaUtilService){
        this.httpService = $http;
        this.logService = LogService;
        this.toastService = ToastService;
        this.messageService = MessageService;
        this.utilService = OrphaUtilService;
        this.initialize();
    }

    initialize(){

        this.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

        this.usersByCategoriesChart = {
            labels:['Ativos', 'Inativos'],
            data:[],
            total:0,
            options:{
                responsive:true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(0, 0, 0)',
                        fontSize: 20
                    },
                    position:'top'
                }
            }
        };

        this.criancasByCategoriesChart = {
            labels:['Ativos', 'Inativos'],
            data:[],
            total:0,
            options:{
                responsive:true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(0, 0, 0)',
                        fontSize: 20
                    },
                    position:'top'
                }
            }
        };

        this.criancasByAgeChart = {
            labels:[],
            data:[[]],
            options:{ maintainAspectRatio: true,
                legend: {display: false},
                dataLabels: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true,
                            stepValue: 1
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Nº de crianças / Adolescentes'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Intervalo de Idades'
                        },
                        gridLines: {
                            display:false
                        }
                    }]
                },
                scaleStartValue: 0
            }
        };

        this.refresh();
    }

    refresh(){
        this.loading = true;
        this.httpService.get('api/orpha/dashboard').then((response) => this.updateData(response.data), (err) => this.showError(err));
    }

    updateData(data){
        this.usersByCategoriesChart.data = [];
        this.usersByCategoriesChart.data.push(data.users.ativos);
        this.usersByCategoriesChart.data.push(data.users.inativos);
        this.usersByCategoriesChart.total = (data.users.ativos+data.users.inativos);

        this.criancasByCategoriesChart.data = [];
        this.criancasByCategoriesChart.data.push(data.criancas.ativos);
        this.criancasByCategoriesChart.data.push(data.criancas.inativos);
        this.criancasByCategoriesChart.total = data.criancas.ativos+data.criancas.inativos;

        this.criancasByAgeChart.data = [[]];
        this.criancasByAgeChart.labels = [];
        this.utilService.forEach(data.criancasByAge, (value, key) => {
            this.criancasByAgeChart.labels.push(key);
            this.criancasByAgeChart.data[0].push(value);
        });
        this.loading = false;
    }

    showError(error){
        this.loading = false;
        this.logService.error(error ? error.error  +": "+error['message'] : this.messageService.get('MSG4'));
        this.toastService.showError(error ? error['message'] : this.messageService.get('MSG4'));
    }
}

DashboardController.$inject = ['$http', 'LogService', 'ToastService', 'MessageService', 'OrphaUtilService'];