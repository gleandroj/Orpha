import { MessageEvents } from  './../services/MessageService';

export default function MessageServiceRun(MessageService, OrphaUtilService, $urlRouter, LogService) {
    'ngInject'

    OrphaUtilService.on(MessageEvents.resourcesUpdated, function () {
        $urlRouter.sync();
        $urlRouter.listen();
        LogService.info('Messages resources updated.');
    });

}