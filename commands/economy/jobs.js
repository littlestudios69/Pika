const mongo = require('../../database/mongo')
const profileSchema = require("../../database/Schematics/Profile")
const Discord = require("discord.js")
const ms = require("ms")
const prefix = "p*"

module.exports = {
    name: 'jobs',
    description: 'Assign, Resign or list Jobs',
    usage: "jobs <assign, resign, list> <jobname (if you assign)>",
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
        const target = message.author
        const userId = target.id

        let jobList = [{
            name: "Scientist",
            description: "You are always looking to discover a new element",
            multi: 2.5
        }, {
            name: "Judge",
            description: "You deal with criminals and their punishments",
            multi: 2.25
        }, {
            name: "Developer",
            description: "You are developing a new app that will change the world",
            multi: 2.0
        }, {
            name: "Police Officer",
            description: "You catch people doing crimes",
            multi: 1.75
        }, {
            name: "YouTuber",
            description: "You eat tide pods for a living",
            multi: 1.5
        }, {
            name: "Fast Food Cook",
            description: "You cook food for others to eat",
            multi: 1.25
        }, {
            name: "Babysitter",
            description: "You take care of other people's children",
            multi: 1.1
        }, {
            name: "Garbage Collector",
            description: "You empty the city's garbage collection",
            multi: 1.0
        }, {
            name: "Discord Mod",
            description: "You ban users for posting memes in general",
            multi: 0.69
        }]

        await mongo().then(async (mongoose) => {
            try {
                if(!args[0]) {
                    message.reply(`Please do, ${prefix}jobs list, ${prefix}jobs assign <job name>`)
                    return;
                }
                if (args[0].toLowerCase() === "list") {
                    let embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle('List of all available jobs')
                        .setAuthor(message.author.tag, message.author.avatarURL({
                            format: "png",
                            dynamic: true
                        }))
                        .setThumbnail(message.client.user.avatarURL())
                        .setTimestamp()
                        .setFooter(`${prefix}jobs assign <job name> to get a job`)

                    let jobAmount = jobList.length

                    for (let i = 0; i < jobAmount; i++) {
                        embed.addField(`${jobList[i].name}`, `${jobList[i].description}`)
                    }

                    return message.channel.send(embed)
                }


                if (args[0].toLowerCase() === "assign") {
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
                    if (data.job === null) data.job === "Unemployed"
                    if (data.job !== "Unemployed") return message.channel.send("You already have a job assigned.")

                    let jobAmount = jobList.length
                    let jobName = args.slice(1).join(" ")

                    for (let i = 0; i < jobAmount; i++) {
                        if (jobName === jobList[i].name) {
                            let newData = await profileSchema.findOneAndUpdate({
                                userId: userId
                            }, {
                                userId: userId,
                                job: jobList[i].name,
                                multiplier: jobList[i].multi
                            }, {
                                upsert: true,
                            })

                            let embed = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setAuthor(message.author.tag, message.author.avatarURL({
                                    format: "png",
                                    dynamic: true
                                }))
                                .setDescription(`You are now assigned the job of a ${jobList[i].name}.\n${jobList[i].description}`)
                                .setThumbnail(message.client.user.avatarURL())
                                .setTimestamp()
                            return message.channel.send(embed)
                        } else continue
                    }
                    return message.channel.send("You entered an invalid job name. Make sure you type it case sensitive.")
                }

                if (args[0].toLowerCase() === "resign") {
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
                            bankRobCooldown: Date.now()
                        })
    
                        data = newData
                    }

                    
                    if (data.job === "Unemployed") return message.channel.send("You already are unemployed!")

                    await profileSchema.findOneAndUpdate({
                        userId: userId
                    }, {
                        userId: userId,
                        job: "Unemployed",
                        multiplier: 1
                    }, {
                        upsert: true,
                    })

                    return message.channel.send(`You have resigned from being a ${data.job}, you are now unemployed.`)
                }
            } catch (e) {
                console.log(e)
                let str = e.message

                if (e.message === "Cannot read property 'job' of null") return message.channel.send("Sorry, please do the command again, this is normal for anyone who has not done an economy command before.\n${Cy1der}#0001 is trying to fix this.")
                else return message.channel.send(`An error occurred: \`${str}\`\nUsually this happens once, please try again.`)
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