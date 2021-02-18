const Discord = require('discord.js');
const { isDuration } = require('moment');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { trimArray } = require('../../helpers/utils');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	PARTNERED_SERVER_OWNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	EARLY_VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
};
const deprecated = ['DISCORD_PARTNER', 'VERIFIED_DEVELOPER'];
module.exports = {
    name: 'user',
    description: 'See some Info about a User',
    usage: 'user <member>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    let user = message.mentions.members.first() || message.guild.members.resolve(args[0]);
    if(!user) return msg.reply("I need a User!")
    user = user.user
    const userFlags = user.flags ? user.flags.toArray().filter(flag => !deprecated.includes(flag)) : [];
		const embed = new MessageEmbed()
			.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setAuthor(user.tag)
			.addField('❯ Discord Join Date', moment.utc(user.createdAt).format('MM/DD/YYYY h:mm A'), true)
			.addField('❯ ID', user.id, true)
			.addField('❯ Bot?', user.bot ? 'Yes' : 'No', true)
			.addField('❯ Flags', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None');
		if (msg.guild) {
			try {
				const member = await msg.guild.members.fetch(user.id);
				const defaultRole = msg.guild.roles.cache.get(msg.guild.id);
				const roles = member.roles.cache
					.filter(role => role.id !== defaultRole.id)
					.sort((a, b) => b.position - a.position)
					.map(role => role.name);
				embed
					.addField('❯ Server Join Date', moment.utc(member.joinedAt).format('MM/DD/YYYY h:mm A'), true)
					.addField('❯ Highest Role',
						member.roles.highest.id === defaultRole.id ? 'None' : member.roles.highest.name, true)
					.addField('❯ Hoist Role', member.roles.hoist ? member.roles.hoist.name : 'None', true)
					.addField(`❯ Roles (${roles.length})`, roles.length ? trimArray(roles, 6).join(', ') : 'None')
					.setColor(member.displayHexColor);
			} catch(err) {
                console.log(err)
				embed.setFooter('Failed to resolve member, showing basic user information instead.');
			}
		}
		return msg.reply(embed);
	}

