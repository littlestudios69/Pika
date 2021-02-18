const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'prestige',
    description: 'Prestige to increase multiplier to earn more money',
    usage: "prestige",
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
        const Prestige = [{
                name: "Banana",
                cost: 150000,
            },

        ]

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
                
                let currentJob = data.job

         

                        if (currentWallet < 250000 && currentJob != requiredJob) {
                            message.reply(`You need to be a Scientist and have :coin: 250 000 in your wallet to prestige`)
                          return   
                        }

                        await profileSchema.findOneAndUpdate({
                            userId: userId
                        }, {
                            userId: userId,
                            wallet: currentWallet - currentWallet,
                            $inc: {
                                prestigeLevel: +1,
                                multiplier: +0.5
                            }
                        }, {
                            upsert: true,
                        })

                        return message.reply(`You have successfully prestiged! Well done!`)
                    
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