/**
 * Created by FG0003 on 20/02/2017.
 */
import moment from 'moment';

DateConfig.$inject = ['$mdDateLocaleProvider', '$provide'];

export default function DateConfig($mdDateLocaleProvider, $provide) {

    $mdDateLocaleProvider.formatDate = function(date) {
        let m = moment(date);
        return m.isValid() ? m.format('DD/MM/YYYY') : null;
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        let m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    $mdDateLocaleProvider.days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
    $mdDateLocaleProvider.shortDays = ['D','S','T','Q','Q','S','S'];

}
