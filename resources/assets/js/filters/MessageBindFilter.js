
export default function MessageBindFilter(MessageService){
    'ngInject'
    return function (msgId, attributes) {
        return MessageService.get(msgId, attributes);
    }
}