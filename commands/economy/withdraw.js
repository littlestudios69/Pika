const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")

module.exports = {
    name: 'withdraw',
    description: 'Withdraw your Money',
    usage: "withdraw <amount>",
    aliases: ["with"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

    module.exports.execute = async(bot, msg, args, data) => {
        let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;

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

                let currentWallet = data.wallet
                let currentBank = data.bank

                let toWith = args[0]
                if(toWith.toLowerCase() === "all"){
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        wallet: currentWallet + currentBank,
                        bank: currentBank - currentBank,
                    }, {
                        upsert: true,
                    })
                    return message.reply(`Successfully withdrawn :coin: **${formatNumber(currentBank)}** from the bank.`)
                }
                toWith = parseInt(args[0])
                if (isNaN(toWith)) return message.channel.send("Please provide a numerical value.")

                if (toWith > data.bank) return message.reply("You don't have that many coins in your bank!")

                await profileSchema.findOneAndUpdate({
                    userId: userId
                }, {
                    userId: userId,
                    wallet: currentWallet + toWith,
                    bank: currentBank - toWith,
                }, {
                    upsert: true,
                })

                return message.reply(`Successfully withdrawn :coin: **${formatNumber(parseInt(args[0]))}** from the bank.`)
            } catch (err) {
                console.log(err)
                message.channel.send(`An error occurred: \`${err.message}\`\nUsually this happens once, please try again.`)
            }
        })
    }

    


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}
function count(arr) {
    let str = ""

    if (arr.length < 1) return "Nothing...\n\n\nSo, maybe buy something?\n\n^_^"

    var current = null
    var cnt = 0

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== current) {
            if (cnt > 0) str += `${current} x${cnt}\n`

            current = arr[i]
            cnt = 1
        } else cnt++
    }

    if (cnt > 0) str += `${current} x${cnt}\n`

    return str
}