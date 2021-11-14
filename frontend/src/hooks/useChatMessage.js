import { useState, useRef, useEffect } from 'react';

import ChatSocket from '@/socket';

const THROTTLE_LIMIT = 50;
const BUFFER_LIMIT = 50;
const MESSAGE_LIMIT = 20;

export default function useChatMessage() {
    const [messageList, setMessageList] = useState([]);
    const messageBuffer = useRef([]);

    const isBufferFull = () => messageBuffer.current.length > BUFFER_LIMIT;

    const isMessageFull = prevMessageList => {
        return (
            messageBuffer.current.length + prevMessageList.length >
            MESSAGE_LIMIT
        );
    };

    const handleGetMessageSliceIndex = prevMessageList => {
        return isMessageFull(prevMessageList) ? -MESSAGE_LIMIT : 0;
    };

    const handleMessageSetState = prevMessageList => {
        const sliceIndex = handleGetMessageSliceIndex(prevMessageList);
        return [...prevMessageList, ...messageBuffer.current].slice(sliceIndex);
    };

    const handleUpdateMessageList = () => {
        setMessageList(handleMessageSetState);
        messageBuffer.current = [];
    };

    const onThrottle = (callback, limit) => {
        let waiting = false;
        let id;
        return message => {
            messageBuffer.current.push(message);
            if (!waiting) {
                waiting = true;
                id = setTimeout(() => {
                    waiting = false;
                    callback.apply(this);
                }, limit);
            }
            if (isBufferFull()) {
                clearTimeout(id);
                waiting = false;
                callback.apply(this);
            }
        };
    };

    const handleSocketMessage = onThrottle(
        handleUpdateMessageList,
        THROTTLE_LIMIT,
    );

    useEffect(() => {
        ChatSocket.on('chat', handleSocketMessage);
    }, []);

    return { messageList };
}