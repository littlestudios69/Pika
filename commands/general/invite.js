const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'invite',
    description: 'Invite me',
    usage: 'invite',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

    

let embed = new Discord.MessageEmbed()
    .setTitle('Invite Pika')
    .setDescription(`[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot) (requires administrator)`)
    .setFooter(bot.config.credits)
    .setColor(bot.config.color);
msg.channel.send(embed)    
}