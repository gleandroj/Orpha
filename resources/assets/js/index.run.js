/**
 * Created by FG0003 on 27/12/2016.
 */

import MessageServiceRun from './run/MessageServiceRun';
import AuthServiceRun from './run/AuthServiceRun';

angular.module('orpha')
    .run(MessageServiceRun)
    //.run(AuthServiceRun);