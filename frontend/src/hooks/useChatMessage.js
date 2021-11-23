import { useEffect } from 'react';

import { go } from '@/util/fp';
import socket from '@/socket';

import useBuffer from './useBuffer';
import useArray from './useArray';
import useThrottle from './useThrottle';

const THROTTLE_LIMIT = 50;
const BUFFER_LIMIT = 50;
const MESSAGE_LIMIT = 100;

export default function useChatMessage() {
    const { arr: messageList, set: setMessageList } = useArray([]);
    const { isBufferFull, flushBuffer, getBufferList, pushBuffer } =
        useBuffer(BUFFER_LIMIT);

    const concatBufferToMessage = msg => msg.concat(getBufferList());
    const sliceMessage = msg => msg.slice(-MESSAGE_LIMIT);

    const handleMessageSetState = prevMsg => {
        return go(prevMsg, concatBufferToMessage, sliceMessage);
    };

    const updateMessage = () => {
        setMessageList(handleMessageSetState);
        flushBuffer();
    };

    const onThrottle = useThrottle(updateMessage, THROTTLE_LIMIT, isBufferFull);

    const handleSocketMessage = msg => {
        setMessageList(prev => {
            let newMessageList = [...prev, msg];
            if (newMessageList.length > MESSAGE_LIMIT) {
                newMessageList = sliceMessage(newMessageList);
            }
            return newMessageList;
        });
        // pushBuffer(msg);
        // onThrottle();
    };

    useEffect(() => {
        socket.chat.onMessage(handleSocketMessage);
        return () => {
            socket.chat.clearChatEvents();
        };
    }, []);

    return { messageList, pushBuffer, onThrottle };
}
