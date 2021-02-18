const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'deposit',
    description: 'Deposit your Money on the Bank',
    usage: "deposit <amount>",
    aliases: ["dep"],
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
                        multiplier: 1,
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

                let toDeposit = args[0]
            
                if(toDeposit.toLowerCase() === "all"){
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        wallet: currentWallet - currentWallet,
                        bank: currentBank + currentWallet,
                    }, {
                        upsert: true,
                    })
                    return message.reply(`Successfully deposited :coin: **${formatNumber(currentWallet)}** from the bank.`)
                }
                toDeposit = parseInt(args[0])
                if (isNaN(toDeposit)) return message.channel.send("Please provide a number of coins")

                if (toDeposit > data.wallet) return message.reply("You don't have that many coins in your wallet!")

                await profileSchema.findOneAndUpdate({
                    userId: userId
                }, {
                    userId: userId,
                    wallet: currentWallet - toDeposit,
                    bank: currentBank + toDeposit,
                }, {
                    upsert: true,
                })

                return message.reply(`Successfully deposited :coin: **${formatNumber(args[0])}** into the bank.`)
            } catch (err) {
                console.log(err)
                message.channel.send(`An error occurred: \`${err.message}\`\nUsually this happens once, please try again.`)
            }
        })
    
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}