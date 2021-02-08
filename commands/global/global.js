const Discord = require('discord.js');

module.exports = {
    name: 'global',
    description: 'Set Globalchat',
    usage: 'global <channel>',
    aliases: [],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let gl = !data.guild.global ? "No Channel" : data.guild.global;

    let newGL = args.join(' ');
    if(!newGL.length) {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription('Global Chat for this guild is <#' + gl + '>.\nGlobalChat State for this guild is `'+ data.guild.global_state +'`')
        return msg.channel.send(embed);
    }
    const GL = msg.mentions.channels.first();

    if(!GL){
        if(args[0] === "on" || args[0] === "off"){
            data.guild.global_state = args[0]
    await data.guild.save();
        let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('GlobalChat State changed to `' + args[0] + '`.')
    return msg.channel.send(embed);
        }else{
            let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Not a Valid State.')
    return msg.channel.send(embed);
        }
    }else{

    data.guild.global = GL.id;
    await data.guild.save();
        if(!data.guild.global_state === "on") return message.reply("Global State is set to Off! Please use `" + prefix + "global on` to activate the Global Chat!")
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('GlobalChat changed to `' + GL + '`.')
    return msg.channel.send(embed);
}}
