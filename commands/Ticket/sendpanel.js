const Discord = require('discord.js');

module.exports = {
    name: 'sendpanel',
    description: 'Send ticket panel',
    usage: 'sendpanel',
    aliases: ["sendpanelmessage"],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}


module.exports.execute = async(bot, msg, args, data) => {
    let guildDB = await bot.data.getGuildDB(msg.guild.id);

    if(guildDB.ticket === "none") { 
            let embed = new Discord.MessageEmbed()
                .setColor(bot.config.color)
                .setDescription(`Set a message first with ${guildDB.prefix}panel <string>.`)
             return msg.channel.send(embed);
    }
    if(guildDB.cticketrole === "none") { 
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Set a ticket role first with ${guildDB.prefix}ticketrole <role>.`)
         return msg.channel.send(embed);
}
        let cembed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`Choose between the following emotes: :ticket:, :tickets:, :speaking_head:, :busts_in_silhouette:`)
        await msg.channel.send(cembed)
            .then(async (chooseembed) => {
                await chooseembed.react("🎫");
                await chooseembed.react("🎟️");
                await chooseembed.react("🗣️");
                await chooseembed.react("👥")
                const filter = async(reaction, user) => {
                    if(user.id === msg.author.id) {
                        await reaction.message.delete()
                        let embed = new Discord.MessageEmbed()
                            .setColor(bot.config.color)
                            .setDescription(`${data.guild.ticket}\n\nReact with ${reaction.emoji.name} to create a ticket`)
                        await msg.channel.send(embed)
                            .then(async (msg) => {
                            await msg.react(reaction.emoji.name);
                            data.guild.ticketmsg = msg.id;
                            await data.guild.save()
                            }); 
                    }
                    
                    
                };
                chooseembed.awaitReactions(filter, { max: 4, time: 10000, errors: ['time'] })
                    .then(collected => {})
                    .catch(async collected => {
                        let aembed = new Discord.MessageEmbed()
                            .setColor(bot.config.color)
                            .setDescription(`Time is over`)
                        await chooseembed.edit(aembed)
                        chooseembed.reactions.removeAll()
                        });

            })

        

}