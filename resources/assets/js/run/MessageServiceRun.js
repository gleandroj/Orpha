import { MessageEvents } from  './../services/MessageService';

MessageServiceRun.$inject = ['MessageService', 'OrphaUtilService', '$urlRouter', 'LogService'];

export default function MessageServiceRun(MessageService, OrphaUtilService, $urlRouter, LogService) {

    OrphaUtilService.on(MessageEvents.resourcesUpdated, function () {
        $urlRouter.sync();
        $urlRouter.listen();
        LogService.info('Messages resources updated.');
    });

}
