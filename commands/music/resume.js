const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'resume',
    description: 'Resume the Music',
    usage: 'resume',
    aliases: ["r"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
} 

module.exports.execute = async(bot, msg, args, data) => {

    let client = bot
    let message = msg
    const player = client.music.players.get(message.guild.id);
    if (!player) return message.channel.send("There is no player in this guild!");

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send("You need to be in a voice channel to use this command!");
    if (channel.id == player.voiceChannel.id) return message.channel.send("You need to be in the same voice channel as me!");
    if (!player.paused) return message.channel.send("The queue is already playing!");
    
    player.pause(false);
    message.channel.send("Resuming.");
}