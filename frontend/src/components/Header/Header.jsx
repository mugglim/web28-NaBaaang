import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderLogo from '@/assets/images/header-logo.svg';
import UserIcon from '@/assets/images/user-icon.svg';
import { flexMixin } from '@/styles/mixins';
import Button from '@/components/Button';
import LoginModal from '@/components/LoginModal';

export default function Header({ isSigin }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleShowModal = () => {
        setModalOpen(true);
    };

    const handleHideModal = () => {
        setModalOpen(false);
    };

    return (
        <HeaderWrap>
            {modalOpen && <LoginModal open onClose={handleHideModal} />}

            <Logo src={HeaderLogo} alt="header-logo" />

            {!isSigin ? (
                <Button text="로그인" size="medium" onClick={handleShowModal} />
            ) : (
                <IconWrap>
                    <Logo src={UserIcon} />
                    {/* <img src={UserIcon} alt/>="" /> */}
                </IconWrap>
            )}
        </HeaderWrap>
    );
}

const HeaderWrap = styled.header`
    width: 100%;
    height: 100px;
    ${flexMixin('row', 'center', 'center')}
    background-color: ${({ theme }) => theme.color.white};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    padding: 0 1em;
    box-sizing: border-box;
`;

const Logo = styled.img`
    height: 60px;
    margin-right: auto;
    cursor: pointer;
`;

const IconWrap = styled.div`
    margin-left: auto;
`;
