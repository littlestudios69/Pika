const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")

module.exports = {
    name: 'shop',
    description: 'View the shop for items to buy',
    usage: "shop <category: food, fun, tech, flex>",
    aliases: [],
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
        const FoodEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Shop | Category - Food")
        .setDescription(`To search for a specific category use ${prefix}shop <category name>, available categories are fun, food, flex and tech`)
        .setAuthor(message.author.tag, message.author.avatarURL({
            format: "png",
            dynamic: true
        }))
        .addField(`Banana`,`Cost: :coin: 30`, true)
        .addField(`\u200B`,`Selling price: :coin: 20`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Apple`,`Cost: :coin: 30`, true)
        .addField(`\u200B`,`Selling price: :coin: 20`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Orange`,`Cost: :coin: 30`, true)
        .addField(`\u200B`,`Selling price: :coin: 20`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Coffee`,`Cost: :coin: 60`, true)
        .addField(`\u200B`,`Selling price: :coin: 40`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Iced Tea`,`Cost: :coin: 60`, true)
        .addField(`\u200B`,`Selling price: :coin: 40`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Soda`,`Cost: :coin: 90`, true)
        .addField(`\u200B`,`Selling price: :coin: 60`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Ice Cream`,`Cost: :coin: 150`, true)
        .addField(`\u200B`,`Selling price: :coin: 100`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Cookie`,`Cost: :coin: 120`, true)
        .addField(`\u200B`,`Selling price: :coin: 80`, true)
        .addField(`\u200B`,`\u200B`)
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${prefix}buy <name> to buy an item`)

        const FoodEmbedTwo = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .addField(`Cake`,`Cost: :coin: 180`, true)
        .addField(`\u200B`,`Selling price: :coin: 120`, true)
        .addField(`\u200B`,`\u200B`)
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${prefix}buy <name> to buy an item`)

        const FunEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Shop | Category - Fun")
        .setDescription(`To search for a specific category use ${prefix}shop <category name>, available categories are fun, food, flex and tech`)
        .setAuthor(message.author.tag, message.author.avatarURL({
            format: "png",
            dynamic: true
        }))
        .addField(`Basketball`,`Cost: :coin: 600 `, true)
        .addField(`\u200B`,`Selling price: :coin: 400`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Soccer Ball`,`Cost: :coin: 600`, true)
        .addField(`\u200B`,`Selling price: :coin: 400`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Football`,`Cost: :coin: 600`, true)
        .addField(`\u200B`,`Selling price: :coin: 400`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`BB Gun`,`Cost: :coin: 2500`, true)
        .addField(`\u200B`,`Selling price: :coin: 2000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`RC Car`,`Cost: :coin: 3500`, true)
        .addField(`\u200B`,`Selling price: :coin: 3000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`RC Drone`,`Cost: :coin: 5000`, true)
        .addField(`\u200B`,`Selling price: :coin: 4000`, true)
        .addField(`\u200B`,`\u200B`)
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${prefix}buy <name> to buy an item`)
    
        const TechEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Shop | Category - Tech")
                .setDescription(`To search for a specific category use ${prefix}shop <category name>, available categories are fun, food, flex and tech`)
        .setAuthor(message.author.tag, message.author.avatarURL({
            format: "png",
            dynamic: true
        }))
        .addField(`Phone`,`Cost: :coin: 10000`, true)
        .addField(`\u200B`,`Selling price: :coin: 6000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Laptop`,`Cost: :coin: 20000`, true)
        .addField(`\u200B`,`Selling price: :coin: 12000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Music Player`,`Cost: :coin: 6500`, true)
        .addField(`\u200B`,`Selling price: :coin: 4000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Virtual Reality Headset`,`Cost: :coin: 125000`, true)
        .addField(`\u200B`,`Selling price: :coin: 8000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Tablet`,`Cost: :coin: 15000`, true)
        .addField(`\u200B`,`Selling price: :coin: 10000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Gaming PC`,`Cost: :coin: 50000`, true)
        .addField(`\u200B`,`Selling price: :coin: 40000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Game Console`,`Cost: :coin: 10000`, true)
        .addField(`\u200B`,`Selling price: :coin: 5000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Game Controller`,`Cost: :coin: 3000`, true)
        .addField(`\u200B`,`Selling price: :coin: 1000`, true)
        .addField(`\u200B`,`\u200B`)
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${prefix}buy <name> to buy an item`)
    
        const FlexEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Shop | Category - Flex")
        .setDescription(`To search for a specific category use ${prefix}shop <category name>, available categories are fun, food, flex and tech`)
        .setAuthor(message.author.tag, message.author.avatarURL({
            format: "png",
            dynamic: true
        }))
        .addField(`N-Word Pass`,`Cost: :coin: 69420 `, true)
        .addField(`\u200B`,`Selling price: :coin: 1`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Guinea Pig`,`Cost: :coin: 100000`, true)
        .addField(`\u200B`,`Selling price: :coin: 95000`, true)
        .addField(`\u200B`,`\u200B`)
        .addField(`Expensive Air`,`Cost: :coin: 1000000`, true)
        .addField(`\u200B`,`Selling price: :coin: 0`, true)
        .addField(`\u200B`,`\u200B`)
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${prefix}buy <name> to buy an item`)

        if (args[0] === "food" ) {
           message.channel.send(FoodEmbed)
           message.channel.send(FoodEmbedTwo)
        } else if(args[0] === "fun"){
            message.channel.send(FunEmbed)
        } else if(args[0] === "tech"){
            message.channel.send(TechEmbed)
        } else if(args[0] === "flex" ){
            message.channel.send(FlexEmbed)
        } else return message.channel.send("Invalid category - Valid categories are: food, fun, tech, flex")
    
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