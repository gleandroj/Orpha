
export default function MessageBindFilter(MessageService){

    return function (msgId, attributes) {
        return MessageService.get(msgId, attributes);
    }
}

MessageBindFilter.$inject = ['MessageService'];