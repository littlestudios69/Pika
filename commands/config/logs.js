const Discord = require('discord.js');

module.exports = {
    name: 'logs',
    description: 'Set the Logs',
    usage: 'logs <channel>',
    aliases: [],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let gl = !data.guild.logs ? "No Channel" : data.guild.logs;

    let newGL = args.join(' ');
    if(!newGL.length) {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription('Logs for this guild is <#' + gl + '>.\nLog State for this guild is `'+ data.guild.log_state +'`')
        return msg.channel.send(embed);
    }
    const GL = msg.mentions.channels.first();

    if(!GL){
        if(args[0] === "on" || args[0] === "off"){
            data.guild.log_state = args[0]
    await data.guild.save();
        let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Log State changed to `' + args[0] + '`.')
    return msg.channel.send(embed);
        }else{
            let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Not a Valid State.')
    return msg.channel.send(embed);
        }
    }else{

    data.guild.logs = GL.id;
    await data.guild.save();
        if(!data.guild.log_state === "on") return message.reply("Log State is set to Off! Please use `" + prefix + "logs on` to activate the Logs!")
        GL.send("This is now the Log Channel!")
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Logs changed to `' + GL + '`.')
    return msg.channel.send(embed);
}}
