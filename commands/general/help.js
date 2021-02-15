const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
    if(!args[0]){
    let embed = new Discord.MessageEmbed()
        .setAuthor('Command list')
        .setFooter(bot.config.credits)
        .setColor(bot.config.color);

    // Personally I would hardcode the help command, it gives much more flexibility than any of the automated options.

    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => file.endsWith('.js'))
        if(commands.length > 0) {
            let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
            embed.addField(c.toUpperCase(), files);
        }
    });
    

    return msg.channel.send(embed);
}else{
    let command = args[0].toLowerCase()
    let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));
    if(!cmdFile) return msg.reply("This Command does not exist! Try "+ prefix + "help to see the aviable Commands!")
    let embed = new Discord.MessageEmbed()
    .setTitle("Help for the Command: " + args[0])
    .setDescription(`**Name:** ${cmdFile.name}\n**Aliases:** ${cmdFile.aliases.join(", ") || "None"}\n**Description:** ${cmdFile.description}\n**Usage:** ${prefix}${cmdFile.usage}\n**Permissions:** ${cmdFile.permissions.join(", ") || "None"}\n**Bot Permissions:** ${cmdFile.botPermissions.join(", ") || "None"}\n**NSFW:** ${cmdFile.nsfw}\n**Cooldown:** ${cmdFile.cooldown}\n**Owner Only:** ${cmdFile.ownerOnly}`)
    .setFooter(bot.config.credits)
        .setColor(bot.config.color);
    msg.channel.send(embed)    
}
}
