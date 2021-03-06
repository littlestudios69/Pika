const Discord = require('discord.js');
const { isDuration } = require('moment');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { trimArray } = require('../../helpers/utils');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Highest'
};
module.exports = {
    name: 'server',
    description: 'See some Info about the Server you are in',
    usage: 'server',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    if (!msg.guild.members.cache.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
    const embed = new MessageEmbed()
        .setColor(0x00AE86)
        .setThumbnail(msg.guild.iconURL({ format: 'png' }))
        .addField('❯ Name', msg.guild.name, true)
        .addField('❯ ID', msg.guild.id, true)
        .addField('❯ Creation Date', moment.utc(msg.guild.createdAt).format('MM/DD/YYYY h:mm A'), true)
        .addField('❯ Owner', msg.guild.owner.user.tag, true)
        .addField('❯ Boost Count', msg.guild.premiumSubscriptionCount || 0, true)
        .addField('❯ Boost Tier', msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None', true)
        .addField('❯ Region', msg.guild.region.toUpperCase(), true)
        .addField('❯ Explicit Filter', filterLevels[msg.guild.explicitContentFilter], true)
        .addField('❯ Verification Level', verificationLevels[msg.guild.verificationLevel], true)
        .addField('❯ Members', msg.guild.memberCount, true)
        .addField('❯ Roles', msg.guild.roles.cache.size, true)
        .addField('❯ Channels', msg.guild.channels.cache.filter(channel => channel.type !== 'category').size, true);
    return msg.reply(embed);
}

