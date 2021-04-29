const Discord = require('discord.js');
const { isDuration } = require('moment');

module.exports = {
  name: 'hackban',
  description: 'Ban users who are not on your Server',
  usage: 'hackban <UserID> <reason>',
  aliases: [],
  permissions: [],
  botPermissions: [],
  nsfw: false,
  cooldown: 0,
  ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
	let userID = args[0];
  
	if (!userID) return message.channel.send('Invalid User ID');
	if (isNaN(userID)) return message.channel.send('Invalid User ID (can only contain numbers)');
	if (userID === message.author.id) return message.reply('Why would you want to ban yourself?');
	if (userID === client.user.id) return message.reply('Why would you ban me?');
	if (userID === message.guild.ownerID) return message.reply('Silly you, trying to ban the Server Owner');
  
	const options = { };
	reason = reason.length ? reason.join(' ') : null;
	if (reason) options.reason = reason;
  
	client.users.fetch(userID).then(async user => {
		await message.guild.members.ban(userID, {reason: reason});
    
		if (guildDB.log_state === 'on') {
		  await messae.guild.channels.resolve(guildDB.logs).send(new Discord.MessageEmbed()
																 .setAuthor(`<${userID}> got Hackbanned`)
																 .setDescription(`${message.author.tag} hackbanned <${userID}> ${reason ? ` with the Reason ${reason}` : ""}!`)
																 .setFooter('Banned at')
																 .setTimestamp()
																 .setColor('RED'))
		}
    
		return message.reply(`<${userID}> got hackbanned.${reason ? ` With the reason of: ${reason}` : ""}`);
	})
}
