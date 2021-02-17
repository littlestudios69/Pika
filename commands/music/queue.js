const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'queue',
    description: 'See the Current Queue',
    usage: 'queue',
    aliases: ["q"],
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
if(!player.queue) return message.channel.send("There is nothing Playing!")
const song = player.queue.current;
let queue = []
let i = 0
player.queue.forEach(song=>{
    if(i > 7) return
i++
    queue.push(i +". " + song.title)
})

    message.channel.send(new MessageEmbed()
    .setTitle("Queue")
    .setDescription(`**Playing Right Now**
    ${song.title}
    
    **Next ${i} Songs**
    ${queue.join("\n") || "Nothing"}
    
    
    Not Displaying ${player.queue.length - i} Songs!
    Duration: ${ms(player.queue.duration)}
    `)
    .setFooter(`Total: ${player.queue.size + 1} Songs`)
    .setColor("RANDOM"))
}