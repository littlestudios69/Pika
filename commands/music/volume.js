const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'volume',
    description: 'Set the Volume',
    usage: 'volume <num>',
    aliases: ["vol", "v"],
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
    let vol = args[0]
    if(isNaN(vol)) return message.channel.send("give me a valid number!")
    player.setVolume(vol)
    message.channel.send("Set Volume to " + vol + "%")
}