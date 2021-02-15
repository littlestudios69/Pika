const Discord = require("discord.js")


module.exports = async(bot, reaction, user) => {
    //Das muss als erstes
    if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            
            reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    let guildDB = await bot.data.getGuildDB(reaction.message.guild.id);
    let memberDB = await bot.data.getMemberDB(user.id);

    if(reaction.message.id === guildDB.ticketmsg) {
        let guild = await bot.guilds.resolve(reaction.message.guild.id);
        if(memberDB.ticketOpen !== "none") {
            reaction.users.remove(user)
           return reaction.message.channel.send("You already have a Ticket open! Please close your Current one and Open a new one!" + `\n*Current Ticket: ${memberDB.ticketOpen}*`).then(msg=>{
               setTimeout(function(){
                msg.delete()
               }, 3000)
           })
        }
        
        if(guildDB.ticketrole === "none") {reaction.users.remove(user)
            return reaction.message.channel.send(`The Guild Owner didn't set a Ticket Staff Role! Please contact the Server Owner to set one!`).then(msg=>{
                setTimeout(function(){
                 msg.delete()
                }, 3000)
            })
        }
        reaction.users.remove(user)
        let cat = reaction.message.channel.parent;
        let position = null;
        if(!cat) {
            position = reaction.message.channel.position+1;
        }
            guild.channels.create('ticket-' + user.username, { 
                parent: cat,
                position: position,
                type: 'text',
                reason: 'Needed a new ticket channel', 
                topic: user.id,
                permissionOverwrites: [{
                    id: reaction.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                    id: bot.user,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                    id: user,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                    id: guildDB.ticketrole,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                    }
                    
                ],
            })
                .then(async (channel)=> { 
                    await channel.send(`<@${user.id}>`)
                     
                    let embed = new Discord.MessageEmbed()
                        .setColor(bot.config.color)
                        .setDescription(`Ticket from ${user.username}\n\nWe will try to help you as soon as possible\nPlease describe your problem so we can help you. When reacting with 🔒 the ticket will be closed.`)
                    await channel.send( { embed } )
                        .then(async (tembed) => {
                            tembed.react("🔒")
                            tembed.pin();
                        })
                    memberDB.ticketOpen = channel.name
                    await memberDB.save()
                })


        } 
        if(reaction.emoji.name === "🔒") {
            if(!user.bot) {
                let channel = reaction.message.channel;
                let guild = reaction.message.guild;
            
                if(channel.name.toLowerCase().startsWith('ticket-')) {
                   await channel.send(`<@${user.id}>, the Channel will be deleted after everything is cached etc!`)
                  reaction.users.remove(user)
                    if(channel.topic === user.id) {
                        channel.delete();
                        memberDB.ticketOpen = "none"
                    await memberDB.save()
                    } else {
                        let member = guild.members.resolve(user.id)
                        if(member.roles.cache.find(r => r.id === guildDB.ticketrole)) {
                            let memberDB2 = await bot.data.getMemberDB(channel.topic);
                            memberDB2.ticketOpen = "none"
                    await memberDB.save()
                            channel.delete();
                        }
                }
            }

            }
            
        }

    
   
};

