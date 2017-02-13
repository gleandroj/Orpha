
export default function MessageServiceRun(MessageService, OrphaUtilService, $urlRouter, LogService) {
    OrphaUtilService.on('messageResourcesUpdated', function () {
        $urlRouter.sync();
        $urlRouter.listen();
        LogService.info('Messages resources updated.');
    });
}