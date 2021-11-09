import db from '../../../models/index.js';
const Channel = db.channel;

const insertChannel = async ({ channelInfo, transaction }) => {
    let option = {};
    if (transaction) option.transaction = transaction;
    try {
        const savedChannel = await Channel.create(channelInfo, option);

        return savedChannel.id;
    } catch (error) {
        console.error(error);
    }
};

const findByChannelId = async ({ channelId, transaction }) => {
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
export default { insertChannel, findByChannelId };
