const Discord = require('discord.js');
const { isDuration } = require('moment');

module.exports = {
    name: 'github',
    description: 'Search up a Github Repository',
    usage: 'github <member> <reason>',
    aliases: ["gh"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    
}
