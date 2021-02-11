module.exports = async(bot) => {
    try {
        bot.user.setPresence({ activity: { name: 'p*help | Little Pika V6', type: 'PLAYING' }, status: 'online' });
        bot.logger.ready(bot.user.tag + ' initialized.');
    } catch (err) {
        bot.logger.error('Ready event error - ' + err);
    }
};
