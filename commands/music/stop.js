const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'stop',
    description: 'Stop da Music',
    usage: "stop",
    aliases: ["leave", "fuckoff", "fucc", "off"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let client = bot
    let message = msg
const player = client.music.get(message.guild.id);
if (!player) return message.channel.send("There is no player to stop.");

const { channel } = message.member.voice;

if (!channel) return message.channel.send("You need to join a voice channel!");
if (channel.id !== player.voiceChannel) return message.channel.send("You are not in the same voice channel as me!");

player.destroy();
message.channel.send("Stopped player and left voice channel!");
}