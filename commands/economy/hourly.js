const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'hourly',
    description: 'Get hourly Money',
    usage: "hourly",
    aliases: [],
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

                if (data.hourlyCooldown > Date.now()) {
                    let timeLeft = Date.parse(data.hourlyCooldown) - Date.now()
                    
                    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
                    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

                    return message.reply(`You must wait **${minutes} minutes and ${seconds} seconds** before claiming your hourly coins again!`)
                } else {
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        hourlyCooldown: Date.now() + ms("1h")
                    })

                    let currentWallet = data.wallet
                    
                    let coinsEarned = Math.floor(700 + 50)
                    let roundedCoins = Math.floor(coinsEarned * 100) / 100

                    await profileSchema.findOneAndUpdate({userId: userId}, {
                        userId: userId,
                        wallet: currentWallet + roundedCoins,
                    }, {
                        upsert: true,
                    })

                    return message.reply(`:coin: ${formatNumber(roundedCoins)} has been added to your wallet!`)
                }
            } catch (err) {
                console.error(err)
                message.channel.send(`An error occurred: ${err.message}\nUsually this happens once, please try again.`)
            }
        })
    
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}