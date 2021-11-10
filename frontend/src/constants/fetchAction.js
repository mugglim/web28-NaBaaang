import {
    API_URL
} from '@/constants/url';

export default function fetchAction({
    type,
    payload
}) {
    switch (type) {
        case 'FETCH_CREATE_CHANNEL':
            return {
                url: `${API_URL}/api/channels`,
                    option: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                        body: JSON.stringify(payload),
                    },
            };
        case 'FETCH_GET_CHANNEL':
            return {
                url: `${API_URL}/api/channels/${payload}`,
                    option: {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    },
            };
        case 'FETCH_OPEN_CHANNEL':
            return {
                url: `${API_URL}/api/channels/${payload}/open`,
                    option: {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    },
            };
        case 'FETCH_CLOSE_CHANNEL':
            return {
                url: `${API_URL}/api/channels/${payload}/close`,
                    option: {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    },
            };
        default:
            return '';
    }
}