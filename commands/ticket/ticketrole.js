const Discord = require('discord.js');


module.exports = {
    name: 'ticketrole',
    description: 'Choose a ticket role.',
    usage: 'ticketrole <string>',
    aliases: [],
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
        if(!(guildDB.ticketrole === "none")) {
            let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Enter a role. Currently is it <@${data.guild.ticketrole}>.`)
        return msg.channel.send(embed);
     } else {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription('Enter a role.')
        return msg.channel.send(embed);
         }  
    }else if(text){
        if(text === "reset") {
            guildDB.ticketrole = "none";
            await guildDB.save();
            let embed = new Discord.MessageEmbed()
                .setColor(bot.config.color)
                .setDescription(`Ticket role has been reset`)
              return msg.channel.send(embed);
        }

        let role = msg.mentions.roles.first();

        guildDB.ticketrole = role.id;
        await guildDB.save();
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Ticket role changed to ${role}.`)
        return msg.channel.send(embed);
    }
}