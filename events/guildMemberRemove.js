const Discord = require('discord.js');


module.exports = async (bot, user) => {
    
    let guildDB = await bot.data.getGuildDB(user.guild.id);
    
    let member = user;
    if(guildDB.welcomerState === "on"){
        if(guildDB.welcomerChannel){
            let guild = bot.guilds.resolve(user.guild.id)
            let channel = await bot.channels.resolve(guildDB.welcomerChannel)
            if(channel && guildDB.welcomerMSGLeave && guildDB.welcomerType){
                var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
                var memberCount2 = guild.members.cache.size;
                let text = guildDB.welcomerMSGLeave.replace("{user}", member.user).replace("{user.tag}", user.user.tag).replace("{user.name}", member.user.username).replace("{user.id}", member.user.id).replace("{server.name}", member.guild.name).replace("{server.id}", member.guild.id).replace("{server.members}", memberCount).replace("{server.members.all}", memberCount2)

                let type = guildDB.welcomerType;
                if(type === "embed"){
                    channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(text)
                    .setTitle(`Bye bye ${member.user.username}`)
                    .setThumbnail(member.user.displayAvatarURL({dynamic: true})))
                }else{
                    channel.send(text)
                }
            }
        }
    }
    if (guildDB.log_state === "on") {
        if(user.user.bot === true){
            let wait = new Discord.MessageEmbed()
                .setAuthor(`[BOT] ${user.user.tag} just left!`, user.user.displayAvatarURL({
                    dynamic: true
                }))
               return bot.channels.resolve(guildDB.logs).send(wait)
        }
        let wait = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} just left!`, member.user.displayAvatarURL({
                dynamic: true
            }))
        bot.channels.resolve(guildDB.logs).send(wait)
          
}}