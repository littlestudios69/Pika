const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'skip',
    description: 'Skip da Music',
    usage: "skip",
    aliases: ["s"],
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
    const embed = new MessageEmbed()

    if (!player) return message.channel.send("There literally is not player for this guild smh");
    if (player.queue.size < 1) return message.channel.send("There is no more songs playing in this guild after this song!");
    

    const { channel } = message.member.voice;

    if (!channel) return message.channel.send("You need to be in a voice channel to use this command!");
    if (channel.id == player.voiceChannel.id) return message.channel.send("You need to be in the same voice channel as me!");
    player.stop()
    let song = player.queue[0]

    embed
    .setColor("RANDOM")
    .setTitle(`Skipped the current song.`)
    .setURL(song.uri)
    .setDescription(`
        Now Playing: ${song.title}\n
        Requested by: ${song.requester.tag}\n
       
    `)
    .setThumbnail(song.thumbnail)
    message.channel.send(embed);

    }
