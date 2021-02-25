const Discord = require('discord.js');

module.exports = {
    name: 'welcomer',
    description: 'Set the Welcomer',
    usage: "welcomer help",
    aliases: [],
    permissions: ['ADMINISTRATOR'],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
    voteRestricted: true
}

module.exports.execute = async (bot, msg, args, data) => {
    let conf = data.guild
    let prefix = data.guild.prefix

    if (!args[0]) {
        msg.reply(new Discord.MessageEmbed()
            .setTitle("Welcomer Config in " + msg.guild.name)
            .setColor(bot.config.color)
            .setDescription(`**State:** ${conf.welcomerState}\n**Join MSG:** ${conf.welcomerMSGJoin}\n**Leave MSG:** ${conf.welcomerMSGLeave}\n**Auto Role:** <@&${conf.welcomerRole}> \`${conf.welcomerRole}\`\n**Channel:** <#${conf.welcomerChannel}> \`${conf.welcomerChannel}\`\n**MSG Type:** ${conf.welcomerType}`))
    } else if (args[0] === "help") {
        msg.reply(new Discord.MessageEmbed()
            .setTitle("Little Studios Welcomer Help")
            .setColor(bot.config.color)
            .setDescription(`**__Here are some Subcommands that you can use:__**\n**help** - Get this MSG\n**set** - Set things in the Welcomer\n**reset** - Set the Welcomer to its original State\n**on/off** - Turn the Welcomer on/off`)
            .setFooter(bot.config.credits))
    }else if(args[0] === "on" || args[0] === "off"){
        data.guild.welcomerState = args[0]
       await data.guild.save()
       msg.channel.send(`Successfully set the Welcomer to `+ args[0])
    
    } else if (args[0] === "reset") {
        msg.reply("Do you really want to reset the Welcomer?\n__Type any key to Continue! To cancel type 'no'!__\n*this sets everything to 'none' and turns off the Welcomer! this action cannot be undone!*")
        let reason = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
            max: 1
        })).first()
        if (["no", "cancel"].includes(reason.content.toLowerCase())) return msg.reply('Cancelled.')
        msg.reply(new Discord.MessageEmbed()
            .setDescription("Resetting Welcomer....")).then(async (msg) => {
            data.guild.welcomerMSGJoin = "none"
            data.guild.welcomerMSGLeave = "none"
            data.guild.welcomerRole = "none"
            data.guild.welcomerChannel = "none"
            data.guild.welcomerType = "none"
            data.guild.welcomerRole = "none"
            data.guild.welcomerState = "off"
            await data.guild.save()
            msg.edit(new Discord.MessageEmbed()
                .setDescription("Successfully reset the Welcomer!"))
        })
    } else if (args[0] === "set") {
        msg.channel.send(new Discord.MessageEmbed()
            .setDescription("**PLEASE NOTE THAT EVERYTHING YOU TYPE WILL BE SET IN THE DB DIRECTLY HOW YOU TYPED IT! IF ANYTHING IS NOT VALID THE BOT WILL JUST SILENTLY DIE!**\nWhat do you want to set?\nYou can set\n`joinmsg`, `leavemsg`, `channel`, `role`, `msgtype`\n\n*type 'cancel' anytime to cancel!*")
            .setColor("GREEN"))
        let what = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
            max: 1
        })).first()
        if (["cancel"].includes(what.content.toLowerCase())) return msg.reply('Cancelled.')

        if (what.content.toLowerCase() === "joinmsg") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Please type in your Message now!\n__Supported Placeholders:__ `{user} - User Mention`, `{user.tag} - User Tag`, `{user.name} - User Username`, `{user.id} - User ID`, `{server.name} - Servername`, `{server.members} - Membercount (without Bots)`, `{server.members.all} - Membercount (with Bots)`, `{server.id} - Server ID` __Every Placeholder will only be replaced ONCE! Membercounts are calculated by Cache!__\n*type 'cancel' to cancel!*"))
            let val = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["cancel"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(`${val.content} will be the Value for the Setting ${what.content}! Is this right?\nYes or No`))
            let approve = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["no"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["yes"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            data.guild.welcomerMSGJoin = val.content
            await data.guild.save()
            msg.reply("Successfully Set! Check with " + prefix + "welcomer")
        } else if (what.content.toLowerCase() === "leavemsg") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Please type in your Message now!\n__Supported Placeholders:__ `{user} - User Mention`, `{user.tag} - User Tag`, `{user.name} - User Username`, `{user.id} - User ID`, `{server.name} - Servername`, `{server.members} - Membercount (without Bots)`, `{server.members.all} - Membercount (with Bots)`, `{server.id} - Server ID` __Every Placeholder will only be replaced ONCE! Membercounts are calculated by Cache!__\n*type 'cancel' to cancel!*"))
            let val = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["cancel"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(`${val.content} will be the Value for the Setting ${what.content}! Is this right?\nYes or No`))
            let approve = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["no"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["yes"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            data.guild.welcomerMSGLeave = val.content
            await data.guild.save()
            msg.reply("Successfully Set! Check with " + prefix + "welcomer")
        } else if (what.content.toLowerCase()=== "channel") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Please type in the Channel __ID__ now!\n*type 'cancel' to cancel!*"))
            let val = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["cancel"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(`${val.content} will be the Value for the Setting ${what.content}! Is this right?\nYes or No`))
            let approve = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["no"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["yes"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            data.guild.welcomerChannel = val.content
            await data.guild.save()
            msg.reply("Successfully Set! Check with " + prefix + "welcomer")
        } else if (what.content.toLowerCase() === "role") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Please type in the Autorole __ID__ now!\n*type 'cancel' to cancel!*"))
            let val = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["cancel"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(`${val.content} will be the Value for the Setting ${what.content}! Is this right?\nYes or No`))
            let approve = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["no"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["yes"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            data.guild.welcomerRole = val.content
            await data.guild.save()
            msg.reply("Successfully Set! Check with " + prefix + "welcomer")
        } else if (what.content.toLowerCase() === "msgtype") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Please type in your Message Type now!\n__Supported:__ `embed`, `normal`\n*type 'cancel' to cancel!*"))
            let val = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["cancel"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["normal", "embed"].includes(val.content.toLowerCase())) return msg.reply('Cancelled.')
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(`${val.content} will be the Value for the Setting ${what.content}! Is this right?\nYes or No`))
            let approve = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                max: 1
            })).first()
            if (["no"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            if (!["yes"].includes(approve.content.toLowerCase())) return msg.reply('Cancelled.')
            data.guild.welcomerType = val.content
            await data.guild.save()
            msg.reply("Successfully Set! Check with " + prefix + "welcomer")
        } else {
            msg.reply("Not a Valid Setting! Please try again with " + prefix + "welcomer set !")
        }

    }else if(args[0] !== "help" && args[0] !== "set" && args[0] !== "on" && args[0] !== "off" && args[0] !== "reset"){
        msg.reply("Not a valid subcmd! Try " + prefix + "welcomer help")
    }

}