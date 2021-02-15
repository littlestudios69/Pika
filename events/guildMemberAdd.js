const Discord = require('discord.js');


module.exports = async (bot, user) => {
    let guildDB = await bot.data.getGuildDB(user.guild.id);

    

    let member = user;
    if(guildDB.welcomerState === "on"){
        if(guildDB.welcomerChannel){
            let guild = bot.guilds.resolve(user.guild.id)
            let channel = await bot.channels.resolve(guildDB.welcomerChannel)
            if(channel && guildDB.welcomerMSGJoin && guildDB.welcomerType){
                var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
                var memberCount2 = guild.members.cache.size;
                let text = guildDB.welcomerMSGJoin.replace("{user}", member.user).replace("{user.tag}", user.user.tag).replace("{user.name}", member.user.username).replace("{user.id}", member.user.id).replace("{server.name}", member.guild.name).replace("{server.id}", member.guild.id).replace("{server.members}", memberCount).replace("{server.members.all}", memberCount2)

                let type = guildDB.welcomerType;
                if(type === "embed"){
                    channel.send(new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(text)
                    .setTitle(`Welcome to ${guild.name}, ${member.user.username}`)
                    .setThumbnail(member.user.displayAvatarURL({dynamic: true})))
                }else{
                    channel.send(text)
                }
                if(guildDB.welcomerRole){
                    let role = guild.roles.resolve(guildDB.role)
                    if(role){
                        try{
                        member.roles.add(role)
                        }catch(err){
                            
                        }
                    }
                }
            }
        }
    }
    if (guildDB.log_state === "on") {
        if(user.user.bot === true){
            let wait = new Discord.MessageEmbed()
                .setAuthor(`[BOT] ${user.user.tag} just joined!`, user.user.displayAvatarURL({
                    dynamic: true
                }))
               return bot.channels.resolve(guildDB.logs).send(wait)
        }
        let created = member.user.createdAt
        let date = `${created.getHours()}:${created.getMinutes()}:${created.getSeconds()}.${created.getMilliseconds()}, ${created.getDate() == 0?(created.getDate()+1)+"st":(created.getDate() == 1?(created.getDate()+1)+"nd":(created.getDate() == 2?(created.getDate()+1)+"rd":(created.getDate()+1)+"th"))} ${created.getMonth()}, ${created.getFullYear()}`
        let wait = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} just joined!`, member.user.displayAvatarURL({
                dynamic: true
            }))
            .setDescription("Doing Background checks please wait <a:loading:740277933633175605>")
        bot.channels.resolve(guildDB.logs).send(wait).then(async (msg) => {
            const {
                DRepClient
            } = require('@drep/api');
            const drep = new DRepClient('D-REP.DR0V8BG2C7MA56UJ9DBV6QBG79RZUD4BLI1NACJWUW754.TAK8VDWIKZ8U');

            let getReputation = async (userID) => {
                let rep = await drep.rep(userID);
                return rep
            }
            
            let rep = await getReputation(member.user.id)
            let text = ""
            //let age = Date.now() - member.user.createdAt / 1000 / 60 / 60 / 24
            //AUFPASSEN: name: ' Discord gejoint' value: new Date(user.createdTimestamp).toLocaleDateString()
            //AUFPASSEN: name: ' Discord gejoint' value: new Date(user.joinedTimestamp).toLocaleDateString()
            let createdAgo = Math.floor((new Date() - created) / ( 1000 * 60 * 60 * 24 ));
            let unpoints = 0
            let unsafe = false
            if (rep.downvotes > rep.upvotes) {
                text += `<a:bad:810548634226786325> More Downvotes than Upvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
                unpoints++
            } else if(rep.upvotes === 0){
                text += `<a:bad:810548634226786325> 0 Upvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
                
            }else
             text += `<a:good:810548506217283596> More Upvotes than Downvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
            if (member.user.displayAvatarURL().startsWith("https://cdn.discordapp.com/embed/avatars")) {
                text += `<a:bad:810548634226786325> Using a Default Avatar\n`
                unpoints++
            } else text += `<a:good:810548506217283596> Not using a Default Avatar\n`
            if(createdAgo < 30){
                text += `<a:bad:810548634226786325> Not a Month old \`${createdAgo} days\`\n`
                unpoints++
            } else text += `<a:good:810548506217283596> Older than a Month \`${createdAgo} Days\`\n`
            if(unpoints > 1){
                unsafe = true
            }
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.tag} just joined!`, member.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`${text}\n${unsafe ? "<a:bad:810548634226786325> User is Potentially Unsafe!" : "<a:good:810548506217283596> User is Safe!"}`)
                .setColor(unsafe ? "RED" : "GREEN")
                msg.delete()
                bot.channels.resolve(guildDB.logs).send(embed)
                if(guildDB.quarantineState === "on"){
                    try{
                   let role = await bot.guilds.resolve(user.guild.id).roles.resolve(guildDB.quarantineRole)
                   await member.roles.add(role)
                   bot.channels.resolve(guildDB.logs).send("Added Quarantine Role to "+ member.user.tag)
                    }catch(err){
                        bot.channels.resolve(guildDB.logs).send("Cant add the Quarantine Role to "+ member.user.tag + " because of " + err.message)
                    }
                }
                
        })
    }
};