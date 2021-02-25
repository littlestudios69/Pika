const Discord = require('discord.js');

module.exports = {
    name: 'quarantine',
    description: 'Set the Quarantine',
    usage: 'Quarantine <roleID>',
    aliases: [],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
    voteRestricted: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let gl = !data.guild.quarantineRole ? "No Role" : data.guild.quarantineRole;

    let newGL = args.join(' ');
    if(!newGL.length) {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription('Quarantine Role for this guild is <@&' + gl + '>.\nQuarantine State for this guild is `'+ data.guild.quarantineState +'`')
        return msg.channel.send(embed);
    }
    const GL = msg.guild.roles.resolve(args[0]);

    if(!GL){
        if(args[0] === "on" || args[0] === "off"){
            data.guild.quarantineState = args[0]
    await data.guild.save();
        let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Quarantine State changed to `' + args[0] + '`.')
    return msg.channel.send(embed);
        }else{
            let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Not a Valid State.')
    return msg.channel.send(embed);
        }
    }else{

    data.guild.quarantineRole = GL.id;
    await data.guild.save();
        if(!data.guild.quarantineState === "on") return message.reply("Quarantine State is set to Off! Please use `" + prefix + "Quarantine on` to activate the Quarantine!")
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription('Quarantine Role changed to `' + GL + '`.')
    return msg.channel.send(embed);
}}
