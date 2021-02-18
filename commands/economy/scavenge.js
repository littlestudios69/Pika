const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'scavenge',
    description: 'Scavenge for items',
    usage: "scavenge",
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
        const ItemsToScavenge = [{
                name: "rock",
            },
            {
                name: "piece of old chewing gum",
            },
            {
                name: "mouldy sock",
            },
            {
                name: "Money Check",
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
                        scavengeCooldown: Date.now(),
                        robCooldown: Date.now(),
                        bankRobCooldown: Date.now(),
                        multiplier: 1,
                        prestigeLevel: 0,
                        level: 1,
                    })

                    data = newData
                }
                if (data.scavengeCooldown > Date.now()) {
                    let timeLeft = Date.parse(data.scavengeCooldown) - Date.now()

                    let hours = Math.floor(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)) / 10)
                    let minutes = Math.floor((Math.floor((timeLeft % (1000 * 60 * 60)) / (100 * 60))) / 10)
                    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

                    return message.reply(`You must wait **${hours} hours, ${minutes} minutes, ${seconds} seconds** before scavenging again!`)
                }
                else {
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        scavengeCooldown: Date.now() + ms("5m")
                    })
                

                let currentWallet = data.wallet
                let chosenItem = ItemsToScavenge[Math.floor(Math.random() * ItemsToScavenge.length)];
                        await profileSchema.findOneAndUpdate({
                            userId: userId
                        }, {
                            userId: userId,
                            wallet: currentWallet,
                            $push: {
                                inventory: chosenItem,
                            }
                        }, {
                            upsert: true,
                        })

                      message.channel.send(`You went scavenging and found a ${chosenItem.name}`)
                    
                
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