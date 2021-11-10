import React from 'react';
import styled, { css } from 'styled-components';
import Box from '@/components/Common/Box';
import Message from './Message';

export default function MessageList({ messageList }) {
    const convertedMessageList =
        messageList &&
        messageList.map(message => (
            <Message
                key={message.id}
                type={message.type}
                nickname={message.nickname}
                content={message.content}
            />
        ));

    return (
        <StyledBox flex={1} height="100%">
            <MessageListBox
                flexDirection="column"
                alignItems="flex-start"
                flex={1}
            >
                {convertedMessageList}
            </MessageListBox>
        </StyledBox>
    );
}

const StyledBox = styled(Box)`
    overflow: hidden;
    list-style: none;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 8px;
    }

    ${({ theme }) => css`
        ::-webkit-scrollbar-thumb {
            background-color: ${theme.color.primary};
            border-radius: 10px;
        }
    `}
`;

const MessageListBox = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
`;