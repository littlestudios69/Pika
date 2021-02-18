const Discord = require('discord.js');
const { isDuration } = require('moment');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { formatNumber } = require('../../helpers/utils');
const request = require('node-superfetch');

module.exports = {
    name: 'stocks',
    description: 'Search up some Stocks',
    usage: 'stocks <stockname>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {

    let message = msg
    let query = args.join(" ")
    try {
        const company = await search(query);
        if (!company) return msg.reply('Could not find any results.');
        const stocks = await fetchStocks(company.symbol);
        if (!stocks) return msg.reply('Could not find any results.');
        const embed = new MessageEmbed()
            .setTitle(`Stocks for ${company.name} (${stocks.symbol.toUpperCase()})`)
            .setColor(0x9797FF)
            .setFooter('Last Updated')
            .setTimestamp(stocks.lastRefresh)
            .addField('❯ Open', `$${formatNumber(stocks.open)}`, true)
            .addField('❯ Close', `$${formatNumber(stocks.close)}`, true)
            .addField('❯ Volume', formatNumber(stocks.volume), true)
            .addField('❯ High', `$${formatNumber(stocks.high)}`, true)
            .addField('❯ Low', `$${formatNumber(stocks.low)}`, true)
            .addField('\u200B', '\u200B', true);
        return msg.channel.send(embed);
    } catch (err) {
        return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}

async function search(query) {
    const { body } = await request
        .get('http://d.yimg.com/autoc.finance.yahoo.com/autoc')
        .query({
            query,
            region: 1,
            lang: 'en'
        });
    if (!body.ResultSet.Result.length) return null;
    return body.ResultSet.Result[0];
}

async function fetchStocks(symbol) {
    const { ALPHA_VANTAGE_KEY } = require("../../config.json");

    const { body } = await request
        .get('https://www.alphavantage.co/query')
        .query({
            function: 'TIME_SERIES_INTRADAY',
            symbol,
            interval: '1min',
            apikey: ALPHA_VANTAGE_KEY
        });
    if (body['Error Message'] || !body['Time Series (1min)']) return null;
    const data = Object.values(body['Time Series (1min)'])[0];
    return {
        symbol,
        open: data['1. open'],
        high: data['2. high'],
        low: data['3. low'],
        close: data['4. close'],
        volume: data['5. volume'],
        lastRefresh: new Date(body['Meta Data']['3. Last Refreshed'])
    };

	}

