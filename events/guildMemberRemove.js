const Discord = require('discord.js');


module.exports = async (bot, user) => {
    
    let guildDB = await bot.data.getGuildDB(user.guild.id);
    
    let member = user;
	
	let isInOtherGuild = false;
	bot.guildcache.each(async (guild) => {
		if(guild.id != member.guild.id){
			try {
				let member2 = await guild.members.fetch(member.user.id);
				if(member2 != null){
					isInOtherGuild = true;
				}
			}catch (ex){}
		}
	})
	if(!isInOtherGuild){
		bot.usercache.delete(member.user.id);
	}
	
    if(guildDB.welcomerState === "on"){
        if(guildDB.welcomerChannel){
            let guild = bot.guilds.resolve(user.guild.id)
            let channel = await bot.channels.resolve(guildDB.welcomerChannel)
            if(channel && guildDB.welcomerMSGLeave && guildDB.welcomerType){
                var members = await guild.members.fetch({force: true})
				var memberCount = members.filter(function(member) { return !member.user.bot }).size;
                var memberCount2 = members.size;
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
            .setTitle("User left")
                .setAuthor(`[BOT] ${user.user.tag}`, user.user.displayAvatarURL({
                    dynamic: true
                }))
               return bot.channels.resolve(guildDB.logs).send(wait)
        }
        let wait = new Discord.MessageEmbed()
        .setTitle("User left")
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({
                dynamic: true
            }))
        bot.channels.resolve(guildDB.logs).send(wait)
          
}}
