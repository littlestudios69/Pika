const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")

module.exports = {
    name: 'profile',
    description: 'See your Profile',
    usage: "profile",
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
        const target = message.mentions.users.first() || message.author
        const userId = target.id
 
        await mongo().then(async (mongoose) => {
            try {
                 let data = await profileSchema.findOne({userId: userId})
 
                 if(!data) {
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
                     })
                     data = newData
                 }
                 const embed = new Discord.MessageEmbed()
                 .setColor('#00ff00')
                 .setTitle(`${target.tag}'s profile`)
                 .addFields(
                     {
                         name: "Job",
                         value: `${data.job}`
                     }, {
                         name: "Coin Balance",
                         value: `\nWallet: :coin: ${data.wallet.toFixed(2)}\nBank :coin: ${data.bank.toFixed(2)}`
                     }, {
                         name: "Coin multiplier",
                         value: `${data.multiplier}`
                     }, {
                         name: "Inventory item count",
                         value: `${formatNumber(data.inventory.length)} items`
                     }, {
                         name: "Prestiges",
                         value: `${data.prestigeLevel}`
                     })  
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