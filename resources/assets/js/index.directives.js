/**
 * Created by FG0003 on 27/12/2016.
 */

import { ErrorMessageDirectivie } from './directives/ErrorMessageDirectivie';

angular.module('orpha.directives')
    .directive(ErrorMessageDirectivie.selector, ErrorMessageDirectivie.fn);