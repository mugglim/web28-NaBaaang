import channelDAO from './channel.dao.js';
import db from '../../../models/index.js';
import { v4 } from 'uuid';
import chatDao from '../chat/chat.dao.js';
import requestHandler from '../../../lib/util/requestHandler.js';
import ROLE from './constant/role.js';

const create = async channelInfo => {
    const transaction = await db.sequelize.transaction();
    try {
        const streamKey = v4();
        channelInfo.streamKey = streamKey;
        const channelId = await channelDAO.insertChannel(
            channelInfo,
            transaction,
        );
        await chatDao.insertChat(channelId, transaction);
        await transaction.commit();
        return channelId;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};
const getChannelById = async id => {
    const transaction = await db.sequelize.transaction();
    try {
        let result = await channelDAO.findByChannelId(id, transaction);
        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

const getAuthenticatedChannelById = async ({ id, role }) => {
    const transaction = await db.sequelize.transaction();
    try {
        let result = await channelDAO.findByChannelId(id, transaction);

        if (role !== ROLE.OWNER) {
            delete result.dataValues.streamKey;
        }
        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

const getLiveChannels = async () => {
    const transaction = await db.sequelize.transaction();
    try {
        const result = await channelDAO.findAllLiveChannel(transaction);
        let groupedData = {};
        result.map(e => {
            if (Object.keys(groupedData).includes(e.category)) {
                groupedData[e.category].push(e);
            } else {
                groupedData[e.category] = [e];
            }
        });
        await transaction.commit();
        return groupedData;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

const updateLive = async (id, isLive) => {
    const transaction = await db.sequelize.transaction();
    try {
        const result = await channelDAO.update(
            { id, updateTarget: { isLive } },
            transaction,
        );

        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

const watchChannel = async req => {
    const transaction = await db.sequelize.transaction();
    try {
        const { id } = req.params;
        const user = requestHandler.getUserFromHeader(req.headers);

        const channel = await channelDAO.findByChannelId(id, transaction);
        await channelDAO.insertWatch(
            { channelId: channel.id, viewerId: user.id },
            transaction,
        );
        await transaction.commit();
        return channel;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

const isChannelOwner = async req => {
    const transaction = await db.sequelize.transaction();
    try {
        const { channelId: expectedId } = req.params;
        const user = requestHandler.getUserFromHeader(req.headers);
        const channel = await channelDAO.findByUserId(user.id, transaction);
        await transaction.commit();
        return channel && expectedId === channel.id;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
    }
};

export default {
    create,
    getChannelById,
    getAuthenticatedChannelById,
    getLiveChannels,
    updateLive,
    watchChannel,
    isChannelOwner,
};
