/**
 * Created by FG0003 on 20/02/2017.
 */
export default function DateConfig($mdDateLocaleProvider) {
    'ngInject'
    /*$mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };*/

    $mdDateLocaleProvider.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    $mdDateLocaleProvider.days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
    $mdDateLocaleProvider.shortDays = ['D','S','T','Q','Q','S','S'];
}

DateConfig.$inject = ['$mdDateLocaleProvider'];