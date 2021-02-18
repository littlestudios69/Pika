const Discord = require('discord.js');
const { isDuration } = require('moment');

module.exports = {
    name: 'kick',
    description: 'Kick a User',
    usage: 'kick <member> <reason>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    let member = message.mentions.members.first() || message.guild.members.resolve(args[0]);
    if(!member) return msg.reply("Member not Found")
    if(member.id === msg.author.id) return msg.reply("Why would you kick yourself?");
    if(member.id === bot.user.id) return msg.reply("Why would you kick me?");
    if(member.id === msg.guild.ownerID) return msg.reply("You can't kick the owner.");
    
    if(member.roles.highest.position >= msg.member.roles.highest.position) return msg.reply("You cannot kick this user.");
    if(!member.kickable) return msg.reply("I cannot kick this user.");
    
    const options = {  };
    reason = reason.length ? reason.join(" ") : null;
    if(reason) options.reason = reason;
    
    await member.kick(options);
    if(guildDB.log_state === "on"){
        await msg.guild.channels.resolve(guildDB.logs).send(new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} got Kicked`)
        .setDescription(`${msg.author.tag} kick ${member.user.tag} ${reason ? ` with the Reason ${reason}` : ""}!`)
        .setFooter("Banned at")
        .setTimestamp()
        .setColor("ORANGE"))
    }
    return msg.reply(`${member.user.tag} got kicked.${reason ? ` With reason of: ${reason}` : ""}`);
}
