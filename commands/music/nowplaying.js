const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const Spotify = require("spotify-finder")
const spotify = new Spotify({
  consumer: {
    key: '5c84fb675a8f4349baf262b059320fe1', // from v2.1.0 is required
    secret: 'f8908f39e2894c83826e0fe292f5560e' // from v2.1.0 is required
  }
})
const canvas = require("canvas")
module.exports = {
    name: 'nowplaying',
    description: 'See what is playing',
    usage: 'nowplaying',
    aliases: ["np", "now"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
} 

module.exports.execute = async(bot, msg, args, data) => {
  
    function percentage(num, per)
    {
      return (num/100)*per;
    }
    let client = bot
    let message = msg
    const player = client.music.players.get(message.guild.id);
    const embed = new MessageEmbed()

    if (!player) return message.channel.send("There literally is not player for this guild smh");
    if (!player.playing || player.paused || !player.queue.current) return message.channel.send("There is no song playing in this guild!");
    const song = player.queue.current;
    console.log(song)
    const params = {
      q: song.title.replace("(Official Audio)", "").replace("(Official Video)"), // required
    }
    spotify.search(params)
      .then(data => {
        console.log(data.tracks.items)
      })
    const time = ms(song.duration);
    const duration = time
    embed
    .setColor("RANDOM")
    .setTitle(`Currently Playing`)
    .setURL(song.uri)
    .setDescription(`\`\`\`${song.title}
        Requested by: ${song.requester.tag}\n
        Duration: ${duration}\n
        Position: ${ms(player.position)}\n
        ${player.position}
        ${percentage(song.duration, player.position)}
        ${client.progressBar(player.position, song.duration, "20")}
        
    `)
    .setThumbnail(song.thumbnail)
    message.channel.send(embed);
    
              

    
      
      function progressBar(percent) {
        let str = "";
        for (let i = 0; i < 12; i++) {
            if (i == parseInt(percent * 12))
                str += "\uD83D\uDD18"; // 🔘
            else
                str += "▬";
        }
        return str;
      }
}

