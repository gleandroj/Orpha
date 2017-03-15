/**
 * Created by FG0003 on 20/02/2017.
 */
import moment from 'moment';

DateConfig.$inject = ['$mdDateLocaleProvider', '$provide'];

export default function DateConfig($mdDateLocaleProvider, $provide) {

    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    $mdDateLocaleProvider.days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
    $mdDateLocaleProvider.shortDays = ['D','S','T','Q','Q','S','S'];

    $provide.decorator('mdDatepickerDirective', ['$delegate',
        function ($delegate) {
            let directive = $delegate[0];

            let template = directive.template;

            directive.template = function (tElement, tAttrs) {

                var originalTemplate = template.apply(this, arguments);

                var element = angular.element(originalTemplate);
                element.find('input').attr('mask', '39/19/9999');
                element.find('input').attr('restrict', 'reject');
                element.find('input').attr('clean', 'true');
                element.find('input').attr('ng-model', "ctrl.dateInput");//ng-model is required by ngMask
                let newTemplate = '';
                for(let i = 0; i < element.length ; i++)
                    newTemplate += element[i].outerHTML;

                return newTemplate;
            };

            return $delegate;
        }
    ]);
}
