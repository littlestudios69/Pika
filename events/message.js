const Discord = require('discord.js');
const embeds = require('../helpers/embeds.js');
const cooldown = {};

module.exports = async (bot, msg) => {
    try {
        if (msg.author.bot || !msg.guild) return;
        let message = msg
        let client = bot

        let guildDB = await bot.data.getGuildDB(msg.guild.id);
        let userDB = await bot.data.getUserDB(msg.author.id);
        let prefix = !guildDB.prefix ? bot.config.prefix : guildDB.prefix;

        if (msg.channel.id === guildDB.global) {
            if(msg.content.includes(prefix)) return msg.reply("No commands in the Global Chat!").then(msg2=>{setTimeout(function(){msg2.delete()
            msg.delete()}, 10000)})
            if(userDB.rank === "Banned") return msg.reply("You are Banned from the Global Chat! If you believe this is an Error join our Support Server: https://discord.gg/EWR6HxXDN6").then(msg2=>{setTimeout(function(){msg2.delete()
            msg.delete()},10000)})
            var msg_content = msg.content.substring(0, 1400) 
            if(msg.content.length > 1400) msg_content += "\n\n\n\n> *The Text was over 1400 Chars so i cutted it to 1400!*\n> *~Little Pika*"
            if (!cooldown[msg.author.id])
                cooldown[msg.author.id] = {};

            let time = cooldown[msg.author.id]["Global"] || 0;
            if (time && (time > Date.now())) {
                let wait = Math.ceil((time - Date.now()) / 1000);
                return embeds.cooldown(msg, wait);
            }
            cooldown[msg.author.id]["Global"] = Date.now() + 7500;
            let premium;
            if (guildDB.premium === "true") premium = "[Premium]"

            let ranks = {
                "Owner": "👑 Owner 👑",
                "Co-Owner": "🤴 Co-Owner 🤴",
                "Admin": "🔑 Admin 🔑",
                "Developer": "👨‍💻 Developer 👨‍💻",
                "Moderator": "🛡️ Moderator 🛡️",
                "Supporter": "🙋 Supporter 🙋",
                "Booster": "⭐ Booster ⭐",
                "Sponsor": "❤️ Sponsor ❤️",
                "Premium": "✨ Premium ✨",
                "Member": "👥 User 👥"
            }
            let color = {
                "Owner": "#fc0303",
                "Co-Owner": "#db2e2e",
                "Admin": "#ffaa00",
                "Developer": "#ffd500",
                "Moderator": "#00c8ff",
                "Supporter": "#00fff7",
                "Booster": "#9900ff",
                "Sponsor": "#33ff00",
                "Premium": "#44ff00",
                "Member": "#2C2F33"
            }
            var link1 = message.attachments.array()[0];
            var link;
            if (link1) link = link1.url
            else link = "nolink"
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${ranks[userDB.rank] || ""} | ${msg.author.tag} | Level: ${userDB.level}`, msg.author.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`${msg_content}\n\n\n` + "[`🤖 Bot Invite`](https://discord.com/oauth2/authorize?client_id=660798952123400202&scope=bot&permissions=8) | [`🌎 Website`](https://little-studios.tech) | [`🆙 Vote`](https://top.gg/bot/660798952123400202/vote)")
                .setFooter(`From ${premium || "👥 User 👥"} ${msg.guild.name} | ID: ${msg.author.id}`, msg.guild.iconURL({
                    dynamic: true
                }))
                .setColor(color[userDB.rank] || "#2C2F33")
                if (msg.stickers.array()[0]) {
                    if(msg.stickers.array()[0].packID === "748286863302852648") embed.setImage(msg.stickers.array()[0].url)
                    else return msg.reply("Sorry! But Little Pika currently only Supports Stickers from the Sticker Pack `What's Up Wumpus` because the newer ones are LOTTIE animations and we cant decode them YET!")
                }
                    
            var testlink = message.content.split(/ +/g).filter(f => f.includes("http") && f.includes("://"))[0]
            if (testlink) {
                if(testlink.startsWith("https://youtu.be" || testlinks.startsWith("https://youtube.com"))){
                    const fetch = require("node-fetch")
                    const cheerio = require("cheerio")
                    
                    await fetch(testlink).then(res => res.text())
                    .then(html => {
                        const $ = cheerio.load(html)
                        const title = $("meta[property='og:title']")[0] || $("meta[name='twitter:title']")
                        const image = $("meta[property='og:image']")[0] || $("meta[name='twitter:image']")[0]
                        const description = $("meta[property='og:description']")[0] || $("meta[name='twitter:description']")[0]

                    
                        embed.setDescription(msg_content.replace(testlink, "") + `` + "\n\n[`🤖 Bot Invite`](https://discord.com/oauth2/authorize?client_id=660798952123400202&scope=bot&permissions=8) | [`🌎 Website`](https://little-studios.tech) | [`🆙 Vote`](https://top.gg/bot/660798952123400202/vote)")
                        embed.addField(`<:youtube:808741805893222472> ${title ? title.attribs.content : "no title"} <:youtube:808741805893222472>`,`${description ? description.attribs.content : 'no description'}\n\n<:youtube:808741805893222472> [Click here to get to the Video](${testlink}) <:youtube:808741805893222472>`)
                        embed.setThumbnail(image ? image.attribs.content : "no image")
                    })
                    return glsend(msg)

                }else{
                    embed.setImage(testlink)
                    embed.setDescription(msg_content.replace(testlink,"")+ `\n\n\n` + "[`🤖 Bot Invite`](https://discord.com/oauth2/authorize?client_id=660798952123400202&scope=bot&permissions=8) | [`🌎 Website`](https://little-studios.tech) | [`🆙 Vote`](https://top.gg/bot/660798952123400202/vote)")
                    return glsend(msg)
                }
                
            } else if (["png", "gif", "jpg"].some(e => link.endsWith(e))) {
                message.reply("Processing your image...").then(fmsg => {

                    client.channels.resolve("808726972322676766").send(`Uploaded by: ${message.author.tag}`, {
                        files: [link]
                    }).then( smsg => {
                        embed.setImage(smsg.attachments.array()[0].url)
                        glsend(msg)
                        fmsg.delete()
                    })
                })
            }else{
                glsend(msg)

            }
            function glsend(msg){
                
                msg.channel.send(embed)
                let xp = userDB.exp + Math.floor(Math.random() * 10);

                userDB.msg_count++
                userDB.exp = xp
                if(userDB.exp > userDB.needed) {userDB.level++
                    let needed_plus = userDB.needed = Math.floor(Math.random() * 500);
                    userDB.needed = needed_plus
                    userDB.exp = 0
                    let embed2 = new Discord.MessageEmbed()
                    .setAuthor(`${msg.author.tag} leveled up!!`)
                    .setDescription(`You are now Level ${userDB.level}! For the Next level you need ${needed_plus} EXP! *this number is randomly generated!*`)
                    .setThumbnail("https://media.tenor.com/images/7ed918fc11bdc4b1dbf9a24e5f13a08d/tenor.gif")
                    .setColor("GREEN")
                    bot.guilds.cache.forEach(async guild => {
                        let guildst = await bot.data.getGuildDB(guild.id);
                        if (guildst.global !== "none") {
                            guild.channels.resolve(guildst.global).send(embed2)
                        } 
                    });
                }
                userDB.save()

                bot.guilds.cache.forEach(async guild => {
                    if (guild.id === msg.guild.id) return
                    let guildst = await bot.data.getGuildDB(guild.id);
                    if (guildst.global !== "none") {
                        guild.channels.resolve(guildst.global).send(embed)
                    } 
                });
                msg.delete()

            }
            }
            
        let argsSlice = prefix.length;

        if (!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            let content = msg.content.trim();
            let mention1 = '<@!' + bot.user.id + '>';
            let mention2 = '<@' + bot.user.id + '>';

            if (content == mention1 || content == mention2)
                return embeds.mention(msg, prefix, bot);

            if (content.startsWith(mention1)) argsSlice = mention1.length
            else if (content.startsWith(mention2)) argsSlice = mention2.length
            else return;
        }

        let args = msg.content.slice(argsSlice).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));

        if (!cmdFile) return;

        let data = {};
        data.user = userDB;
        data.guild = guildDB;
        data.cmdFile = cmdFile;

        if (!msg.channel.nsfw && cmdFile.nsfw)
            return embeds.nsfw(msg);

        let isOwner = bot.config.owners.includes(msg.author.id);
        if (cmdFile.ownerOnly && !isOwner) return;
        if ((cmdFile.permissions && !msg.member.permissions.has(cmdFile.permissions)) && !isOwner)
            return embeds.permissions(msg, cmdFile);

        if (cmdFile.botPermissions && !msg.guild.me.permissions.has(cmdFile.botPermissions))
            return embeds.botPermissions(msg, cmdFile);

        if (cmdFile.cooldown) {
            if (!cooldown[msg.author.id])
                cooldown[msg.author.id] = {};

            let time = cooldown[msg.author.id][cmdFile.name] || 0;
            if (time && (time > Date.now())) {
                let wait = Math.ceil((time - Date.now()) / 1000);
                return embeds.cooldown(msg, wait);
            }
            cooldown[msg.author.id][cmdFile.name] = Date.now() + cmdFile.cooldown;
        }

        cmdFile.execute(bot, msg, args, data);
    } catch (err) {
        bot.logger.error('Command execution error - ' + err);
    }
}