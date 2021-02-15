const Discord = require('discord.js');

module.exports = {
    name: 'config',
    description: 'See the Config of this Server',
    usage: "config",
    aliases: ["conf"],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let conf = data.guild
    
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setTitle(`Config from ${msg.guild.name}`)
            .addField("Major", `**Prefix:** ${conf.prefix}\n**Premium:** ${conf.premium}`, true)
            .addField("States", `**Quarantine:** ${conf.quarantineState}\n**Global:** ${conf.global_state}\n**Logs:** ${conf.log_state}\n**Welcomer:** ${conf.welcomerState}`, true)
            .addField("Channels", `**Logs:** <#${conf.logs}> \`${conf.logs}\`\n**Global:** <#${conf.global}> \`${conf.global}\`\n**Welcomer:** <#${conf.welcomerChannel}> \`${conf.welcomerChannel}\``, true)
            .addField("Roles", `**Ticket Staff:** <@&${conf.ticketrole}> \`${conf.ticketrole}\`\n**Quarantine:** <@&${conf.quarantineRole}> \`${conf.quarantineRole}\`\n**Welcomer Auto Role:** <@&${conf.welcomerRole}> \`${conf.welcomerRole}\``, true)
            .addField("Others", `**Ticket Panel Message:** ${conf.ticket}\n**Ticket Panel Message ID:** ${conf.ticketmsg}\n**Guild ID:** ${conf.id}`, true)
            .addField("Welcomer", `**Join MSG:** ${conf.welcomerMSGJoin}\n**Leave MSG:** ${conf.welcomerMSGLeave}`,true)
            .addField("Database Information", `**_ID:** ${conf._id} | **__V:** ${conf.__v}`)
        return msg.channel.send(embed);
    
   
}
