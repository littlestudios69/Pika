const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")

module.exports = {
    name: 'balance',
    description: 'See your Balance',
    usage: "balance",
    aliases: ["bal"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

    module.exports.execute = async(bot, msg, args, data) => {
        let message = msg
        let client = bot
        const target = message.mentions.users.first() || message.author
        const userId = target.id

        await mongo().then(async (mongoose) => {
            try {
                let data = await profileSchema.findOne({userId: userId})

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

                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${target.tag}'s coin balance`)
                .setDescription(`\n**Wallet:** :coin: ${data.wallet.toFixed(2)}\n**Bank:** :coin: ${formatNumber(data.bank)}`)
                .setThumbnail(target.displayAvatarURL({
                    format: 'png',
                    dynamic: true
                }))
                .setTimestamp()
                return message.channel.send(embed)
            } catch (e) {
                console.log(e)
                message.channel.send(`An error occurred: ${e.message}\nUsually this happens once, please try again.`)
            }
        })
    
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}