const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'daily',
    description: 'Get your Daily Money',
    usage: "daily",
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
    
}

    module.exports.execute = async(bot, msg, args, data) => {
        let message = msg
        let client = bot
        let target = message.author
        let userId = target.id

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

                if (data.dailyCooldown > Date.now()) {
                    let timeLeft = Date.parse(data.dailyCooldown) - Date.now()

                    let hours = Math.floor(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)) / 10)
                    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
                    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

                    return message.reply(`You must wait **${hours} hours, ${minutes} minutes, ${seconds} seconds** before claiming your daily coins again!`)
                } else {
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        dailyCooldown: Date.now() + ms("24h")
                    })

                    let currentWallet = data.wallet
                    
                    let coinsEarned = Math.floor(1000 + 1000)
                    let roundedCoins = Math.floor(coinsEarned * 100) / 100

                    let afterDaily = await profileSchema.findOneAndUpdate({userId: userId}, {
                        userId: userId,
                        wallet: currentWallet + roundedCoins,
                    }, {
                        upsert: true,
                    })

                    return message.reply(`:coin: ${formatNumber(roundedCoins)} has been added to your wallet! You now have :coin: ${afterDaily.wallet + roundedCoins}`)
                }
            } catch (err) {
                console.error(err)
                message.channel.send(`An error occurred: ${e.message}\nUsually this happens once, please try again.`)
            }
        })
    
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}