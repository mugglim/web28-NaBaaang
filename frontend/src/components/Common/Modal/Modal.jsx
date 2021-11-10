import React from 'react';
import styled from 'styled-components';
import { flexMixin } from '@/styles/mixins.js';

import Portal from '@/Portal';
import Card from '@/components/Common/Card';
import Button from '@/components/Common/Button';
import Box from '@/components/Common/Box';

export default function Modal({
    open,
    showButton,
    onClose,
    onSuccess,
    onCancleText,
    onSuccessText,
    children,
}) {
    const cancleText = !onCancleText ? 'Cancle' : onCancleText;
    const successText = !onSuccessText ? 'OK' : onSuccessText;

    if (!open) return null;

    return (
        <Portal elementId="modal-root">
            <ModalBox width="100%" height="100%">
                <OverlayBox onClick={onClose} width="100%" height="100%" />
                <Card flexDirection="column" width="350px" height="350px">
                    <Box flex={0.5}>
                        <ModalHeader>NaBaang</ModalHeader>
                    </Box>
                    {children && <ContentBox flex={3}>{children}</ContentBox>}

                    {showButton && (
                        <ButtonBox flex={1} alignItems="flex-end">
                            <Button
                                color="error"
                                onClick={onClose}
                                text={cancleText}
                                size="medium"
                            />

                            <Button
                                color="success"
                                onClick={onSuccess}
                                text={successText}
                                size="medium"
                            />
                        </ButtonBox>
                    )}
                </Card>
            </ModalBox>
        </Portal>
    );
}

const ModalBox = styled(Box)`
    position: fixed;
    left: 0;
    top: 0;
    border: 1px solid black;
    z-index: 1024;
`;

const ModalHeader = styled.h3`
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: auto;
    text-align: center;
`;

const OverlayBox = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.8);
    z-index: -1;
`;

const ContentBox = styled(Box)`
    text-align: center;
    margin-bottom: auto;
    ${flexMixin('column', 'center', 'center')}
`;

const ButtonBox = styled(Box)`
    width: 100%;
    margin-top: auto;
    button {
        margin: 0 auto;
    }
`;