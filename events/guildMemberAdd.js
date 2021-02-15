const Discord = require('discord.js');


module.exports = async (bot, user) => {
    let guildDB = await bot.data.getGuildDB(user.guild.id);

    let member = user;
    if (guildDB.log_state === "on") {
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
            let age = new Date(member.user.createdTimestamp).toLocaleDateString()
            
            console.log(age)
            let unsafe = false
            if (rep.downvotes > rep.upvotes) {
                text += `<a:bad:810548634226786325> More Downvotes than Upvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
                unsafe = true
            } else if(rep.upvotes === 0){
                text += `<a:bad:810548634226786325> 0 Upvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
                unsafe = true
            }else
             text += `<a:good:810548506217283596> More Upvotes than Downvotes on [discordrep](https://discordrep.com/u/${member.user.id}) *${rep.downvotes} Down / ${rep.upvotes} Up*\n`
            if (member.user.displayAvatarURL().startsWith("https://cdn.discordapp.com/embed/avatars")) {
                text += `<a:bad:810548634226786325> Using a Default Avatar\n`
                unsafe = true
            } else text += `<a:good:810548506217283596> Not using a Default Avatar\n`

            let embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.tag} just joined!`, member.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`${text}\n${unsafe ? "<a:bad:810548634226786325> User is Potentially Unsafe!" : "<a:good:810548506217283596> User is Safe!"}`)
                .setColor(unsafe ? "RED" : "GREEN")
                msg.delete()
                bot.channels.resolve(guildDB.logs).send(embed)

                
        })
    }
};