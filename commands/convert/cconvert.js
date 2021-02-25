const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { formatNumber } = require('../../util/Util');
const request = require('node-superfetch');
let rates = new Map();

module.exports = {
    name: 'cconvert',
    description: 'Convert Currencies',
    usage: 'cconvert 1 USD EUR',
    aliases: ["convert"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
    voteRestricted: true

}

module.exports.execute = async(bot, msg, args, data) => {
    let amount = args[0]
    let base = args[1]
    let target = args[2]
    if(isNaN(amount)) return msg.reply("Please give me a Number as the First Argument!")
    if(!base) return msg.reply("Please give me the Currency you want to convert from!")
    if(!target) return msg.reply("Please give me the Currency you want to convert to!")

    if (base === target) return msg.reply(`Converting ${base} to ${target} is the same value, dummy.`);
    try {
        const rate = await fetchRate(base, target);
        let embed = new Discord.MessageEmbed()
        .setTitle("Currency Convert")
        .setDescription(`**__Finished__**\n**Amount:** ${formatNumber(amount)}\n**Base:** ${base}\n**Target:** ${target}\n\n**__Result:__**\n${formatNumber(amount)} ${base} is ${formatNumber(amount* rate)} ${target}.`)
        .setColor("GREEN")
        .setFooter(bot.config.credits)
        return msg.reply(embed);
    } catch (err) {
        if (err.status === 400) return msg.reply('Invalid base/target.');
        return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
    }
    

async function fetchRate(base, target) {
    const query = `${base}-${target}`;
    if (rates.has(query)) return rates.get(query);
    const { body } = await request
        .get('https://api.exchangeratesapi.io/latest')
        .query({
            base,
            symbols: target
        });
    rates.set(query, body.rates[target]);
    setTimeout(() => rates.delete(query), 1.8e+6);
    return body.rates[target];
}