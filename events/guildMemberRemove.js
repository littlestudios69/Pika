const Discord = require('discord.js');


module.exports = async (bot, user) => {
    
    let guildDB = await bot.data.getGuildDB(user.guild.id);

    let member = user;
    if (guildDB.log_state === "on") {
        let wait = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} just left!`, member.user.displayAvatarURL({
                dynamic: true
            }))
        bot.channels.resolve(guildDB.logs).send(wait)
          
}}