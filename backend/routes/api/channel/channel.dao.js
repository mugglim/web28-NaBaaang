// import db from '../../../models/index.js';
import db from '../../../models/index.js';
const Channel = db.channel;

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
            { where: { isLive: true } },
            option,
        );

        return channels;
    } catch (error) {
        console.error(error);
    }
};

const update = async ({ id, updateTarget }, transaction) => {
    let option = {};
    console.log({ id, updateTarget });
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
export default { insertChannel, findByChannelId, findAllLiveChannel, update };