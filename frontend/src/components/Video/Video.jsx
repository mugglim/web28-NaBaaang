import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import HLS from 'hls.js/dist/hls';

import { sizeMixin } from '@/styles/mixins';
import { MEDIA_URL } from '@/constants/url';

import Box from '@/components/Common/Box';

export default function Video({ streamKey }) {
    const videoRef = useRef();
    const m3u8URL = `${MEDIA_URL}/${streamKey}.m3u8`;

    const hls = new HLS();

    useEffect(() => {
        if (HLS.isSupported()) {
            hls.attachMedia(videoRef.current);

            hls.on(HLS.Events.MEDIA_ATTACHED, () => {
                hls.loadSource(m3u8URL);
            });

            hls.on(HLS.Events.ERROR, () => {
                // hls.loadSource(m3u8URL);
            });

            hls.on(HLS.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });
        }
    }, []);

    return HLS.isSupported() ? (
        <Box width="100%" height="100%">
            <StyledVideo controls autoplay muted ref={videoRef} />
        </Box>
    ) : (
        <div>스트리밍을 지원하지 않습니다.</div>
    );
}

const StyledVideo = styled.video`
    ${sizeMixin('100%', '100%')};
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`;
