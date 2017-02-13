
export default function MessageBindFilter(MessageService){
    return function (msgId, attributes) {
        return MessageService.getMessage(msgId, attributes);
    }
}