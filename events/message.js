const Discord = require('discord.js');
const embeds = require('../helpers/embeds.js');
const cooldown = {};

module.exports = async(bot, msg) => {
    try {
        if(msg.author.bot || !msg.guild) return;
        
        let guildDB = await bot.data.getGuildDB(msg.guild.id);
        let userDB = await bot.data.getUserDB(msg.author.id);

        if(msg.channel.id === guildDB.global){
            let premium;
            if(guildDB.premium === "true") premium = "[Premium]"
            let embed = new Discord.MessageEmbed()
            .setAuthor(`${userDB.rank} | ${msg.author.tag}`, msg.author.displayAvatarURL({dynamic: true}))
            .setDescription(`${msg.content}\n\n\n`+ "[`🤖 Bot Invite`](https://discord.com/oauth2/authorize?client_id=660798952123400202&scope=bot&permissions=8) | [`🌎 Website`](https://little-studios.tech) | [`🆙 Vote`](https://top.gg/bot/660798952123400202/vote)")
            .setFooter(`From ${premium}${msg.guild.name} | ID: ${msg.author.id}`, bot.user.displayAvatarURL())
            msg.channel.send(embed)
            msg.delete()
            bot.guilds.cache.forEach( async guild => {
                if(guild.id === msg.guild.id) return
                let guildst = await bot.data.getGuildDB(guild.id);
                if(guildst.global !== "none"){
                    guild.channels.resolve(guildst.global).send(embed)
                }
            });
        }
        let prefix = !guildDB.prefix ? bot.config.prefix : guildDB.prefix;
        let argsSlice = prefix.length;

        if(!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            let content = msg.content.trim();
            let mention1 = '<@!' + bot.user.id + '>';
            let mention2 = '<@' + bot.user.id + '>';

            if(content == mention1 || content == mention2)
                return embeds.mention(msg, prefix, bot);

            if(content.startsWith(mention1)) argsSlice = mention1.length
            else if(content.startsWith(mention2)) argsSlice = mention2.length
            else return;
        }

        let args = msg.content.slice(argsSlice).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));

        if(!cmdFile) return;

        let data = {};
        data.user = userDB;
        data.guild = guildDB;
        data.cmdFile = cmdFile;

        if(!msg.channel.nsfw && cmdFile.nsfw)
            return embeds.nsfw(msg);

        let isOwner = bot.config.owners.includes(msg.author.id);
        if(cmdFile.ownerOnly && !isOwner) return;
        if((cmdFile.permissions && !msg.member.permissions.has(cmdFile.permissions)) && !isOwner)
            return embeds.permissions(msg, cmdFile);

        if(cmdFile.botPermissions && !msg.guild.me.permissions.has(cmdFile.botPermissions))
            return embeds.botPermissions(msg, cmdFile);

        if(cmdFile.cooldown) {
            if(!cooldown[msg.author.id])
                cooldown[msg.author.id] = {};

            let time = cooldown[msg.author.id][cmdFile.name] || 0;
            if(time && (time > Date.now())) {
                let wait = Math.ceil((time - Date.now()) / 1000);
                return embeds.cooldown(msg, wait);
            }
            cooldown[msg.author.id][cmdFile.name] = Date.now() + cmdFile.cooldown;
        }

        cmdFile.execute(bot, msg, args, data);
    } catch(err) {
        bot.logger.error('Command execution error - ' + err);
    }
}
