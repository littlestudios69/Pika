const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'support',
    description: 'Join our Support Server',
    usage: 'support',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

    

let embed = new Discord.MessageEmbed()
    .setTitle('Pika Support Server')
    .setDescription(`[Click here to go to our Support Server](https://discord.gg/EWR6HxXDN6)`)
    .setFooter(bot.config.credits)
    .setColor(bot.config.color);
msg.channel.send(embed)    
}