const Discord = require('discord.js');
const { isDuration } = require('moment');

module.exports = {
    name: 'ban',
    description: 'Let the Ban Hammer Speak',
    usage: 'ban <member> <reason>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    let member = message.mentions.members.first() || message.guild.members.resolve(args[0]);
    if(!member) return msg.reply("Member not Found")
    if(member.id === msg.author.id) return msg.send("Why would you ban yourself?");
    if(member.id === bot.user.id) return msg.send("Why would you ban me?");
    if(member.id === msg.guild.ownerID) return msg.send("You can't ban the owner.");
    
    if(member.roles.highest.position >= msg.member.roles.highest.position) return msg.send("You cannot ban this user.");
    if(!member.bannable) return msg.send("I cannot ban this user.");
    
    const options = { };
    reason = reason.length ? reason.join(" ") : null;
    if(reason) options.reason = reason;
    
    await member.ban(options);
    if(guildDB.log_state === "on"){
        await msg.guild.channels.resolve(guildDB.logs).send(new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} got Banned`)
        .setDescription(`${msg.author.tag} banned ${member.user.tag} ${reason ? ` with the Reason ${reason}` : ""}!`)
        .setFooter("Banned at")
        .setTimestamp()
        .setColor("RED"))
    }
    return msg.send(`${member.user.tag} got banned.${reason ? ` With reason of: ${reason}` : ""}`);
}
