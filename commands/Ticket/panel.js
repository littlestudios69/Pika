const Discord = require('discord.js');

module.exports = {
    name: 'panel',
    description: 'Choose a ticket message for the bot.',
    usage: 'panel <string>',
    aliases: ["panelmessage"],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}


module.exports.execute = async(bot, msg, args, data) => {
    let guildDB = await bot.data.getGuildDB(msg.guild.id);

    let text = args.join(" ");
    if(!text) { 
        if(!(guildDB.ticket === "none")) {
            let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Enter a text. Currently is it ${data.guild.ticket}.`)
        return msg.channel.send(embed);
     } else {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription('Enter a text')
        return msg.channel.send(embed);
         }  
    }else if(text){
        if(text === "reset") {
            guildDB.ticket = "none";
            await guildDB.save();
            let embed = new Discord.MessageEmbed()
                .setColor(bot.config.color)
                .setDescription(`Panel message has been reset`)
              return msg.channel.send(embed);
        }
        
        if(text.length > 150) {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Message shouldn't be longer than 150 characters. Yours has ${text.length}.`)
        return msg.channel.send(embed);
    }

    guildDB.ticket = text;
    await guildDB.save();
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setDescription(`Panel message changed to ${text}.`)
    return msg.channel.send(embed);
    }
}