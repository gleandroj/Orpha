/**
 * Created by FG0003 on 27/12/2016.
 */

import MessageBindFilter from './filters/MessageBindFilter';
import StartFromFilter from './filters/StartFromFilter';

angular.module('orpha.filters')
    .filter('startFrom', StartFromFilter)
    .filter('message', MessageBindFilter);