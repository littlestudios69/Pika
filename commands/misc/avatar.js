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

module.exports.execute = async(bot, msg, args) {
   let avEmbed = new Discord.MessageEmbed();
   
   if (!message.mentions.users.first()) {
     avEmbed.setTitle('Your avatar!');
     avEmbed.setColor('RANDOM');
     avEmbed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
     
     return message.channel.send(avEmbed);
   } else {
     let target = message.mentions.members.first();
     
     avEmbed.setTitle(`${bot.users.cache.get(target.id).tag}'s avatar!`);
     avEmbed.setColor('RANDOM');
     avEmbed.setThumbnail(bot.users.cache.get(target.id).displayAvatarURL({ dynamic: true }));
     
     return message.channel.send(avEmbed);
}
