const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Display the targets avatar.',
  usage: 'avatar',
  aliases: ['av'],
  permissions: [],
  botPermissions: [],
  nsfw: false,
  cooldown: 0,
  ownerOnly: false
}

module.exports.execute = async(bot, msg, args) => {
	let avEmbed = new Discord.MessageEmbed();
   
	if (!msg.mentions.members.first()) {
		avEmbed.setAuthor(`${msg.author.tag}'s avatar!`, msg.author.displayAvatarURL());
		avEmbed.setColor('RANDOM');
		avEmbed.setImage(msg.author.displayAvatarURL({ dynamic: true }));
     
		return msg.channel.send(avEmbed);
	} else {
		let target = msg.mentions.members.first();
     
		avEmbed.setTitle(`${bot.users.cache.get(target.id).tag}'s avatar!`, target.user.displayAvatarURL());
		avEmbed.setColor('RANDOM');
		avEmbed.setImage(bot.users.cache.get(target.id).displayAvatarURL({ dynamic: true }));
     
		return msg.channel.send(avEmbed);
	}
}
