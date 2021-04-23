const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
let cats = {
    "⚙️":"config",
    "🧮": "convert",
    "💰":"economy",
    "👀":"general",
    "💡":"misc",
    "🔨":"moderation",
    "🎵":"music",
    "🔞":"nsfw",
    "👑":"owner",
    "🎫": "ticket"
}
module.exports.execute = async(bot, msg, args, data) => {
    let cmduser = msg.member.id

    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
    if(!args[0]){
    let embed = new Discord.MessageEmbed()
        .setAuthor('Command list')
        .setFooter(`${bot.commands.size} Commands in Total | `+bot.config.credits)
        .setColor(bot.config.color)
        .setDescription(`Use \`${prefix}help COMMAND\` to get a detailed look at a Command`)

    // Personally I would hardcode the help command, it gives much more flexibility than any of the automated options.

    embed.addField('⚙️ CONFIG', '> Press ⚙️ to see this Category', true)
    embed.addField('🧮 CONVERT', '> Press 🧮 to see this Category', true)
    embed.addField('💰 ECONOMY', '> Press 💰 to see this Category', true)
    embed.addField('👀 GENERAL', '> Press 👀 to see this Category', true)
    embed.addField('💡 MISC', '> Press 💡 to see this Category', true)
    embed.addField('🔨 MODERATION', '> Press 🔨 to see this Category', true)
    embed.addField('🎵 MUSIC', '> Press 🎵 to see this Category', true)
    embed.addField('🔞 NSFW', '> Press 🔞 to see this Category', true)
    embed.addField('👑 OWNER', '> Press 👑 to see this Category', true)
    embed.addField('🎫 TICKET', '> Press 🎫 to see this Category', true)
    embed.addField(' ⠀ \n ⠀ ', ' ⠀ ')
    embed.addField(":bar_chart: Status Page",'> [Click here](https://littlestudios.statuspage.io/)', true)
    embed.addField('🤝 Support Server', `> [Click here](https://discord.gg/EWR6HxXDN6)`, true)
    embed.addField('❤️ Invite Me', `> [Click here](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`, true)
    let categories = await readdir('./commands/');
    /*categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => file.endsWith('.js'))
        if(commands.length > 0) {
            let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
            embed.addField(c.toUpperCase() + ` \`[${commands.length}]\``, files);
        }
    });*/
    

    let embedMsg = await msg.channel.send(embed);
    let emojis = ["⚙️", "🧮", "💰","👀", "💡","🔨","🎵","🔞","👑","🎫"]
    for(const emoji of emojis)
    embedMsg.react(emoji).catch(e=>console.log("couldnt add reaction"))
    const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name) && user.id === cmduser;
    };

    embedMsg.awaitReactions(filter, { max: 1, time: 30 * 1000, errors: ['time'] })
            	.then(collected => {
                    embedMsg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
                   
                  catembed(cats[collected.first().emoji.name], embedMsg, cmduser, bot, prefix)
              })
            	.catch(e => {
                embedMsg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
                msg.channel.send("Time ran out")
            	});


}else{
    let command = args[0].toLowerCase()
    let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));
    if(!cmdFile) return msg.reply("This Command does not exist! Try "+ prefix + "help to see the aviable Commands!")
    let embed = new Discord.MessageEmbed()
    .setAuthor("Help for the Command: " + args[0])
    .setDescription(`**Name:** ${cmdFile.name}\n**Aliases:** ${cmdFile.aliases.join(", ") || "None"}\n**Description:** ${cmdFile.description}\n**Usage:** ${prefix}${cmdFile.usage}\n**Permissions:** ${cmdFile.permissions.join(", ") || "None"}\n**Bot Permissions:** ${cmdFile.botPermissions.join(", ") || "None"}\n**NSFW:** ${cmdFile.nsfw}\n**Cooldown:** ${cmdFile.cooldown}\n**Owner Only:** ${cmdFile.ownerOnly}`)
    .setFooter(bot.config.credits)
        .setColor(bot.config.color);
    msg.channel.send(embed)    
}
}



async function catembed(cat, message, cmduser, bot, prefix){

    let embed = new Discord.MessageEmbed()
    .setTitle(`Commands from ${cat.toUpperCase()}`)
    .setColor(bot.config.color)
    .setDescription("Click ⏪ to get back to the Main Menu")
   
    let commands = fs.readdirSync('./commands/' + cat + '/').filter(file => file.endsWith('.js'))
    if(commands.length > 0) {
        let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
        embed.addField(cat.toUpperCase() + ` \`[${commands.length}]\``, files);
    }
    embed.addField(' ⠀ \n ⠀ ', ' ⠀ ')
    embed.addField(":bar_chart: Status Page",'> [Click here](https://littlestudios.statuspage.io/)', true)
    embed.addField('🤝 Support Server', `> [Click here](https://discord.gg/EWR6HxXDN6)`, true)
    embed.addField('❤️ Invite Me', `> [Click here](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`, true)
    message.edit(embed).then(msg=>{
        msg.react("⏪")
        const filter = (reaction, user) => {
            return ["⏪"].includes(reaction.emoji.name) && user.id === cmduser;
        };
      msg.awaitReactions(filter, { max: 1, time: 60 * 1000, errors: ['time'] })
        .then(async (collected) => {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));


        let embed = new Discord.MessageEmbed()
        .setAuthor('Command list')
        .setFooter(`${bot.commands.size} Commands in Total | `+bot.config.credits)
        .setColor(bot.config.color)
        .setDescription(`Use \`${prefix}help COMMAND\` to get a detailed look at a Command`)

    // Personally I would hardcode the help command, it gives much more flexibility than any of the automated options.

    embed.addField('⚙️ CONFIG', '> Press ⚙️ to see this Category', true)
    embed.addField('🧮 CONVERT', '> Press 🧮 to see this Category', true)
    embed.addField('💰 ECONOMY', '> Press 💰 to see this Category', true)
    embed.addField('👀 GENERAL', '> Press 👀 to see this Category', true)
    embed.addField('💡 MISC', '> Press 💡 to see this Category', true)
    embed.addField('🔨 MODERATION', '> Press 🔨 to see this Category', true)
    embed.addField('🎵 MUSIC', '> Press 🎵 to see this Category', true)
    embed.addField('🔞 NSFW', '> Press 🔞 to see this Category', true)
    embed.addField('👑 OWNER', '> Press 👑 to see this Category', true)
    embed.addField('🎫 TICKET', '> Press 🎫 to see this Category', true)
    embed.addField(' ⠀ \n ⠀ ', ' ⠀ ')
    embed.addField(":bar_chart: Status Page",'> [Click here](https://littlestudios.statuspage.io/)', true)
    embed.addField('🤝 Support Server', `> [Click here](https://discord.gg/EWR6HxXDN6)`, true)
    embed.addField('❤️ Invite Me', `> [Click here](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`, true)
    let categories = await readdir('./commands/');
    /*categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => file.endsWith('.js'))
        if(commands.length > 0) {
            let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
            embed.addField(c.toUpperCase() + ` \`[${commands.length}]\``, files);
        }
    });*/
    

    let embedMsg = await msg.edit(embed);
    let emojis = ["⚙️", "🧮", "💰","👀", "💡","🔨","🎵","🔞","👑","🎫"]
    for(const emoji of emojis)
    embedMsg.react(emoji).catch(e=>console.log("couldnt add reaction"))

    const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name) && user.id === cmduser;
    };

    embedMsg.awaitReactions(filter, { max: 1, time: 30 * 1000, errors: ['time'] })
            	.then(collected => {
                    embedMsg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
                  catembed(cats[collected.first().emoji.name], embedMsg, cmduser, bot, prefix)
              })
            	.catch(e => {
                    message.channel.send("Time ran out")
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));

            	});


      })
        .catch(e => {
        try{
            message.channel.send("Time ran out")
          message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));
        }catch{ /* */ }
        });
    })
}