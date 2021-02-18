const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'pay',
    description: 'Pay someone',
    usage: "pay <mention> <amount>",
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
        let amount = parseFloat(args[1])
        let roundedAmount = Math.floor(amount * 100) / 100

        const target1 = message.author
        const target2 = message.mentions.members.first()
        if(!target2){
            message.channel.send('You need to specify a user to give coins to')
            return;
        }
        if (target1 === target2) return message.reply("You cannot give coins to yourself!")

        const userId1 = target1.id
        const userId2 = target2.id

        if(!amount){
            message.channel.send('You need to specify an amount of coins to give the user')
            return;
        }

        await mongo().then(async (mongoose) => {
            try {
                let data1 = await profileSchema.findOne({
                    userId: userId1
                })
                let data2 = await profileSchema.findOne({
                    userId: userId2
                })

                if (!data1) {
                    let newData1 = await profileSchema.create({
                        userId: userId1,
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

                    data1 = newData1
                }

                if (!data2) {
                    let newData2 = await profileSchema.create({
                        userId: userId2,
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

                    data2 = newData2
                }

                let currentWallet1 = data1.wallet
                let currentWallet2 = data2.wallet

               
                if (roundedAmount > currentWallet1) return message.reply("You don't have that many coins in your wallet!")

                await profileSchema.findOneAndUpdate({
                    userId: userId1
                }, {
                    userId: userId1,
                    wallet: currentWallet1 - roundedAmount,
                }, {
                    upsert: true,
                })

                await profileSchema.findOneAndUpdate({
                    userId: userId2
                }, {
                    userId: userId2,
                    wallet: currentWallet2 + roundedAmount,
                }, {
                    upsert: true,
                })

                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(':coin: Coin Transfer')
                .setDescription('Success!')
                .addField(`\u200B`,`From ${target1}`)
                .addField(`\u200B`, `To ${target2}`)
                .addField(`Amount`, `:coin: ${roundedAmount}`)
                .setTimestamp()
                msg.reply(embed)
                return;
            } catch (err) {
                console.log(err)
                message.channel.send(`An error occurred: \`${err.message}\`\nUsually this happens once, please try again.`)
            }
        })
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
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        }