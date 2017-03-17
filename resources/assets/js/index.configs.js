/**
 * Created by FG0003 on 27/12/2016.
 */

import MessageServiceConfig from './config/MessageServiceConfig';
import AuthServiceConfig from './config/AuthServiceConfig';
import AngularConfig from './config/AngularConfig';
import RouteAppConfig from './config/RouteAppConfig';
import DialogServiceConfig from './config/DialogServiceConfig';
import ThemeConfig from './config/ThemeConfig';
import DateConfig from './config/DateConfig';
import ChartConfig from './config/ChartConfig';

angular.module('orpha.config')
        .config(MessageServiceConfig)
        .config(AuthServiceConfig)
        .config(AngularConfig)
        .config(RouteAppConfig)
        .config(DialogServiceConfig)
        .config(ThemeConfig)
        .config(DateConfig);

ChartConfig(Chart);