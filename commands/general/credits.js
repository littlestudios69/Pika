const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'credits',
    description: 'Our Credits',
    usage: 'credits',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

    let tayron = await bot.users.fetch("510104921887211533")
    let tinte = await bot.users.fetch("454631784043511816")
    let felix = await bot.users.fetch("265912060007677953")
    let shy = await bot.users.fetch("704708159901663302")
    let mac = await bot.users.fetch("705080774113886238")
    let niekol = await bot.users.fetch("323049053094936576")

let embed = new Discord.MessageEmbed()
    .setTitle('Little Pika V6 - Credits')
    .setDescription(`Little Pika V6 is a new amazing Adventure for everyone of us!\nBut without some help it wouldn't be possible to work!\nSo...\nWithout these Wonderful people Little Pika V6 wouldnt be a thing!\n\n`)
    .addField("Developers",`<:arrow_r:811955030462169109> <@510104921887211533> \`(${tayron.tag})\` - Idea and Forming of the Bot

    <:arrow_r:811955030462169109> <@265912060007677953> \`(${felix.tag})\` - Help with the Servers and all technical things

    <:arrow_r:811955030462169109> <@454631784043511816> \`(${tinte.tag})\` - Help with most of the Commands and spicy Canvas Pictures

    <:arrow_r:811955030462169109> <@704708159901663302> \`(${shy.tag})\` - Doing the Economy Commands

    <:arrow_r:811955030462169109> <@323049053094936576> \`(${niekol.tag})\` - Doing new Moderation Bot for Support Server`)
    .addField("Testers", `<:arrow_r:811955030462169109> <@705080774113886238> \`(${mac.tag})\` - Testing literally Everything

    <:arrow_r:811955030462169109> Some alt Accounts from the Developers `)
    .addField("Users", `<:arrow_r:811955030462169109> You
    
    <:arrow_r:811955030462169109> All of the other ${bot.users.cache.size - 1} Users!`)
    .setFooter(bot.config.credits)
    .setColor(bot.config.color);
msg.channel.send(embed)    
}