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
     avEmbed.setAuthor(`${bot.users.cache.get(target.id).tag}'s avatar!`, message.author.displayAvatarURL());
     avEmbed.setColor('RANDOM');
     avEmbed.setImage(message.author.displayAvatarURL({ dynamic: true }));
     
     return message.channel.send(avEmbed);
   } else {
     let target = message.mentions.members.first();
     
     avEmbed.setTitle(`${bot.users.cache.get(target.id).tag}'s avatar!`, target.user.displayAvatarURL());
     avEmbed.setColor('RANDOM');
     avEmbed.setImage(bot.users.cache.get(target.id).displayAvatarURL({ dynamic: true }));
     
     return message.channel.send(avEmbed);
}
