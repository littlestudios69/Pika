const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { formatNumber } = require('../../util/Util');
const outputTimezones = [
    'UTC',
    'Europe/London',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Asia/Hong_Kong',
    'Asia/Kolkata',
    'Europe/Moscow',
    'Europe/Berlin',];

module.exports = {
    name: 'tz',
    description: 'Convert Timezones',
    usage: 'tz Asia/Tokyo',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let tzString = args[0]
    if(!outputTimezones.includes(tzString)) return msg.reply("This is not a Valid Timezone! Valid Timezones are: ```" + outputTimezones.join(", ") + "```")
    function convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date).toLocaleString() : date).toLocaleString("en-US", {timeZone: tzString}));   
    }

    // Bonus: You can also put Date object to first arg
    const date = new Date()
    msg.reply(new Discord.MessageEmbed()
    .setTitle("Timezone Convert")
    .setDescription(`**__Finished__**\n**Date (Europe/Berlin):** ${date.toLocaleString()}\n**Timezone String:** ${tzString}\n\n**__Result:__**\nIt is ${await convertTZ(date, tzString)} in ${tzString}.`)
    .setFooter(bot.config.credits)
    .setColor("GREEN"))
   
    
    }
    
  
