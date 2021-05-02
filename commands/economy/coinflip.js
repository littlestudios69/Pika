const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'coinflip',
    description: 'Flip a Coin',
    usage: "coinflip <heads/tails> <amount>",
    aliases: ["cf"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

    module.exports.execute = async(bot, msg, args, data) => {
        let message = msg
        let client = bot
        let target = message.author
        let userId = target.id
		
        let guildDB = await bot.data.getGuildDB(msg.guild.id);
        let prefix = !guildDB.prefix ? bot.config.prefix : guildDB.prefix;
        
		if(args.length < 2){
            message.channel.send('Usage: `' + prefix + 'coinflip <heads/tails> <amount to bet>`')
            return;
		}
        const UserChoice = args[0].toLowerCase()
        const UserCoinsToBet = parseInt(args[1]) 
        if(UserChoice != "tails" && UserChoice != "heads"){
            message.channel.send('Please provide a response of either heads or tails')
            return;
        }
        if(!UserCoinsToBet){
            message.channel.send('Please provide an amount of coins you want to bet')
            return;
        }

        
        
       
        var rand = ['Heads', 'Tails'][Math.floor(Math.random() * 2)];

        await mongo().then(async (mongoose) => {
        try {
            let data = await profileSchema.findOne({
                userId: userId
            })

            if (!data) {
                let newData = await profileSchema.create({
                    userId: userId,
                    job: "Unemployed",
                    bank: 0,
                    wallet: 0,
                    inventory: [Object],
                    dailyCooldown: Date.now(),
                    workCooldown: Date.now(),
                    weeklyCooldown: Date.now(),
                    monthlyCooldown: Date.now(),
                    hourlyCooldown: Date.now(),
                    begCooldown: Date.now(),
                    robCooldown: Date.now(),
                    bankRobCooldown: Date.now(),
                    multiplier: 1,
                    prestigeLevel: 0,
                    level: 1,
                })

                data = newData
            }
            let currentWallet = data.wallet

        if (currentWallet < UserCoinsToBet) {
            return message.reply(`You don't have enough coins to do that!`) 
        }

            if(rand !== UserChoice){
                await profileSchema.findOneAndUpdate({
                    userId: userId,
                }, {
                    userId: userId,
                    wallet: currentWallet - UserCoinsToBet,
                }, {
                    upsert: true,
                })
                return message.reply(`Oh no you lost! Bye bye money`)
            } else {
                

                await profileSchema.findOneAndUpdate({
                    userId: userId,
                }, {
                    userId: userId,
                    wallet: currentWallet + UserCoinsToBet,
                }, {
                    upsert: true,
                })

                        return message.reply(`You guessed correctly and earned :coin: ${UserCoinsToBet * 2 * data.multiplier}!`)
                    
            }

        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\`\nUsually this happens once, please try again.`)
        }
            
        })
    
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}