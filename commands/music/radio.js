const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")
const radiolist = require("./radiolist.json")
module.exports = {
    name: 'radio',
    description: 'Listen to Radios',
    usage: "radio <list | l | play | p | suggest | s>",
    aliases: ["r"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
    voteRestricted: false
}


    
    module.exports.execute = async(bot, msg, args, data) => {
       
        let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
        if(!args[0]) return msg.reply("This is a SubCommand only Command! To see all Aviable Radios try the subcommand `list` or `l`")
        if(args[0].toLowerCase() === "list" || args[0].toLowerCase() === "l"){
            if(!args[1]){
            let countries = []
            for (var key in radiolist){
               countries.push(JSON.stringify(key))
              }
              let embed = new Discord.MessageEmbed()
              .setTitle("Little Pika Supported Radios")
              .setDescription("**NEW**\nCheckout our new Radio: TAC-FM! Play it by typing: `"+ prefix + "radio play TAC-FM`!\n**NEW**\n\nHere is a list of all Countries that we have Radios from!\n Use `" + prefix + "radio list <country>` to get the Radios of that Country!"+`\n\n\`${countries.join("`, `")}\``+ "\n\nTo Suggest a Station use " + prefix + "radio suggest <name> <stream url MP3/AAC/M3U> <country>")
              .setColor(bot.config.color)
              .setFooter(bot.config.credits)
              msg.reply(embed)
            }else{
                let radios = []
                for (var key in radiolist){

                    if(key.toLowerCase() === args[1].toLowerCase()) {
                    
                    for (var key2 in radiolist[key]){
                        radios.push(JSON.stringify(radiolist[key][key2]).split(":")[0].replace("{", "").replace(`"`,"").replace(`"`,""))   
                    }
                    }
                   }
                   if(!radios[0]) return msg.reply("No Radios Found in Country: "+ args[1])
                   let embed = new Discord.MessageEmbed()
                   .setTitle("Little Pika Supported Radios")
                   .setDescription(`To Play a Radio use \`${prefix} radio play [NAME]\`!\nHere are All Radios in "${args[1]}" that are Currently Supported by us!\n\n\`${radios.join("`, `")}\`` + "\n\nTo Suggest a Station use " + prefix + "radio suggest <name> <stream url MP3/AAC/M3U> <country>")
                   .setColor(bot.config.color)
                   .setFooter(bot.config.credits)
                   msg.reply(embed)
                                }
            }
            if(args[0].toLowerCase() === "suggest" || args[0].toLowerCase() === "s"){
                if(!args[1]) return msg.reply("Please give me the Name of the Radio!")
                if(!args[2]) return msg.reply("Please give me the MP3/AAC/M3U Stream link of the Radio Station!")
                if(!args[3]) return msg.reply("Please give me the Country of the Radio!")

                if(!args[2].startsWith("http://") && !args[2].startsWith("https://")) return msg.reply("The Radio URL is not a real URL! Please make it a URL! *Please note that Radio Names must be only 1 Word!*")
                let embed = new Discord.MessageEmbed()
                .setTitle("New Radio Suggestion")
                .setDescription(`**Name:** ${args[1]}\n**Stream URL:** ${args[2]}\n**Country:** ${args[3]}\n\nIs this information right?*use yes or no*`)
                .setColor(bot.config.color)
                msg.reply(embed)
                let e = (await msg.channel.awaitMessages((m) => m.author == msg.author, {
                    max: 1
                })).first()
                if (["cancel","no"].includes(e.content.toLowerCase())) return msg.reply('Cancelled.')
                if (["yes"].includes(e.content.toLowerCase())){
                    bot.channels.resolve("813379540210548746").send(new Discord.MessageEmbed()
                    .setTitle("New Radio Station Suggestion")
                    .setDescription(`**Suggestor:** ${msg.author.tag}\n**Station Name:** ${args[1]}\n**Station URL:** [Click here](${args[2]})\n**Country:** ${args[3]}`)
                    .setColor(bot.config.color)).then(async (msg)=>{
                        await msg.react("<a:BirdUpvote:813389137092411432>")
                        await msg.react("<:downvote:813389082444038164>")
                    })
                    msg.reply("Sent your Suggestion to https://discord.gg/Yz7qHQq5vs")
                }

            }

            if(args[0].toLowerCase() === "play" || args[0].toLowerCase() === "p"){
                if(!args[1]) return msg.reply("You need to give me a Radio Station! To see all Radio Stations that are currently Supported use " + prefix + "radio list")
                const MAX_NO_OF_TRIALS = 10;

    let message = msg
    const { channel } = message.member.voice;
    let client = bot
    this.client = bot

    const embed = new MessageEmbed()
    .setColor("RANDOM");
    
    if (!channel) return message.channel.send("You need to be in the same voice channel as me!");

    let player = client.music.create({
        guild: message.guild.id,
        textChannel: message.channel.id,
        voiceChannel: channel.id,
        selfDeafen: true
    })
    try {
        let radiotext = "none"
        await radio(radiolist, args[1])
        function radio(radiolist, args)
        {
        for (var key in radiolist){
            for (var key2 in radiolist[key]){
                if(JSON.stringify(radiolist[key][key2]).split(":")[0].replace("{", "").replace(`"`,"").replace(`"`,"").toLowerCase() === args.toLowerCase()){
                radiotext = JSON.stringify(radiolist[key][key2]).replace("}", "").replace("{","").replace(JSON.stringify(radiolist[key][key2]).split(":")[0].replace("{", "").replace(`"`,"").replace(`"`,""), "").replace(`:`,"").replaceAll(`"`,"")
                }
            }
            }
           }
        
           if(radiotext === "none") return msg.reply("Not a valid Station! To see all Radio Stations that are currently Supported use `" + prefix + "radio list`\nTo Suggest a Station use `" + prefix + "radio suggest <name> <stream url MP3/AAC/M3U> <country>`")
        res = await search2(client, radiotext, message.author, message, player);
        if (res.loadType == "LOAD_FAILED") {
             message.channel.send("Oopsie doodles! Something went VERY wrong on our side. Don't worry, this has been reported to our devs!");
            setTimeout(() => player.destroy(), 60000);
        }
        switch (res.loadType) {
            case "NO_MATCHES":
              
                return message.channel.send(embed.setDescription("Couldn't find any songs! Try something else... maybe?"));
        
            case "TRACK_LOADED":
                if (player.state !== "CONNECTED") player = player.connect();
            case "SEARCH_RESULT":
                if (player.state !== "CONNECTED") player = player.connect();
                player.queue.add(res.tracks[0]);
    
                if (!player.playing && !player.paused && !player.queue.size) player.play(res.tracks[0], { noReplace: true });
                return message.channel.send(embed.setDescription(`Added \`${res.tracks[0].title}\` to the queue!`));
            
            case "PLAYLIST_LOADED":
                if (player.state !== "CONNECTED") player = player.connect();
    
                player.queue.add(res.tracks);
    
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                return message.channel.send(embed.setDescription(`Added \`${res.playlist.name}\` to the queue!`)); 
        }
    } catch (e) {
        console.log(e)
        message.channel.send("Oopsie doodles! Something went VERY wrong on our side. Don't worry, this has been reported to our devs!");
    }
            }
    }
    async function search2(client, query, author, message, player, trialNumber = 0) {
        const MAX_NO_OF_TRIALS = 10;

        try {
    
            // Do the actual search here like the following
            const result = await player.search(query, author)
            
            if (result.exception || !(result.tracks.length || result.playlist.tracks.length)){
                return message.channel.send("We got an Exception with the Message: ```" + result.exception.message + "```\nPlease try again with another Playlist or Song!\n*Note that Podcasts aren't supported by us!*")
            }
            return result
    
        } catch (error) {
            if (trialNumber < MAX_NO_OF_TRIALS) {
                return await search2(client, query, author, message,player, ++trialNumber)
            }
            else
            return JSON.parse(`{
                "loadType": "NO_MATCHES",
                "tracks": [
                ],
                "playlist": null,
                "exception": null
              }
              `)
        }
    }
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
