// import db from '../../../models/index.js';
import db from '../../../models/index.js';
const Channel = db.channel;
const Watch = db.watch;

const insertChannel = async (channelInfo, transaction) => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const savedChannel = await Channel.create(channelInfo, option);

        return savedChannel.id;
    } catch (error) {
        console.error(error);
    }
};

const findByChannelId = async (channelId, transaction) => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const savedChannel = await Channel.findOne(
            {
                include: [
                    {
                        model: db.chat,
                        as: 'chat',
                        attributes: ['id'],
                    },
                    {
                        model: db.user,
                        as: 'streamer',
                        attributes: ['nickname', 'imageUrl'],
                    },
                ],
                where: {
                    id: channelId,
                },
            },
            option,
        );

        return savedChannel;
    } catch (error) {
        console.error(error);
    }
};

const findAllLiveChannel = async transaction => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const channels = await Channel.findAll(
            {
                include: {
                    model: db.user,
                    as: 'streamer',
                    attributes: ['nickname', 'imageUrl'],
                },
                where: { isLive: true },
            },

            option,
        );

        return channels;
    } catch (error) {
        console.error(error);
    }
};

const update = async ({ id, updateTarget }, transaction) => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const channels = await Channel.update(
            updateTarget,
            { where: { id } },
            option,
        );

        return channels;
    } catch (error) {
        console.error(error);
    }
};

const insertWatch = async (watchInfo, transaction) => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const watch = await Watch.create(watchInfo, option);

        return watch;
    } catch (error) {
        console.error(error);
    }
};
export default {
    insertChannel,
    findByChannelId,
    findAllLiveChannel,
    update,
    insertWatch,
};
