const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'work',
    description: 'Work to earn some Money',
    usage: "work",
    aliases: ["w"],
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
                        userId: target.id,
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
                if (data.job === "Unemployed") return message.reply("You must be employed to work.")
                else if (data.workCooldown > Date.now()) {
                    let timeLeft = Date.parse(data.workCooldown) - Date.now()

                    let hours = Math.floor(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)) / 10)
                    let minutes = Math.floor((Math.floor((timeLeft % (1000 * 60 * 60)) / (100 * 60))) / 10)
                    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

                    return message.reply(`You must wait **${hours} hours, ${minutes} minutes, ${seconds} seconds** before working again!`)
                } else {
                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        workCooldown: Date.now() + ms("0.5 hrs")
                    })

                    let hours = Math.floor(Math.random() * 12) + 1
                    let paycheck = (Math.floor(Math.random() * 1500) + 1) * data.multiplier
                    let roundedPaycheck = Math.floor(paycheck * 100) / 100

                    let currentWallet = data.wallet

                    let afterWork = await profileSchema.findOneAndUpdate({
                        userId: userId,
                    }, {
                        userId: userId,
                        wallet: currentWallet + roundedPaycheck
                    }, {
                        upsert: true,
                    })
                    const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${message.author.username} - the ${data.job}`)
                    .addField(`\u200B`, `You worked ${hours} hours as a ${afterWork.job} and gained :coin: ${formatNumber(roundedPaycheck)}.`)
                    .addField(`\u200B`, `You now have :coin: ${formatNumber(afterWork.wallet + roundedPaycheck)} in your wallet.`)

                    message.channel.send(embed)
                    return;
                }
            } catch (e) {
                console.log(e)
                message.channel.send(`An error has occurred: ${e.message}\nUsually this happens once, please try again.`)
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