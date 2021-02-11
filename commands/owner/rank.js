const Discord = require('discord.js');
const { isDuration } = require('moment');

module.exports = {
    name: 'rank',
    description: 'Set a Rank',
    usage: 'rank <member> <rank>',
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
    let user = await bot.data.getUserDB(member.id);
    if(!user) return msg.reply("Not in DB")
    if(args[1]){
        user.rank = args[1]
        msg.reply("User got Rank: " + args[1])
        user.save()
    }else{
        msg.reply("Give me a Rank!")
    }
}
