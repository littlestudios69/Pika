const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'play',
    description: 'Play some Tunes',
    usage: 'play',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
} 

module.exports.execute = async(bot, msg, args, data) => {

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

    if (!args.length) return message.channel.send("You need to give me a URL or a query to search!");


    const search = args.join(" ");
    let res;

    try {
        
        res = await search2(client, search, message.author, message, player);
        if (res.loadType == "LOAD_FAILED") {
            if(search.includes("https://open.spotify.com")){
                setTimeout(() => player.destroy(), 60000);
                console.log(res)
                return message.channel.send("10 or more Tracks you Provided can't be found on Youtube!\n*Please note that we search for Spotify songs on Youtube!*")
            

            }
             message.channel.send("Oopsie doodles! Something went VERY wrong on our side. Don't worry, this has been reported to our devs!");
            setTimeout(() => player.destroy(), 60000);
        }
        switch (res.loadType) {
            case "NO_MATCHES":
                if(search.includes("https://open.spotify.com")){
                message.channel.send("10 or more Tracks you Provided can't be found on Youtube!\n*Please note that we search for Spotify songs on Youtube!*")
                if (!player.queue.current) {
                    setTimeout(() => player.destroy(), 60000);
                }
            }
                if (!player.queue.current) {
                    setTimeout(() => player.destroy(), 60000);
                }
                return message.channel.send(embed.setDescription("Couldn't find any songs! Try something else maybe?"));
        
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

    

    async function search2(client, query, author, message, player, trialNumber = 0) {
    
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
    
    
    
    
    // then you can use it inside an async block like:
    
    // try {
    
    //     let searchResults = await search(client, query, message.author)
    
    //     // do stuff with searchResults
    
    // } catch (error) {
    //     // Error persists after 5 (MAX_NO_OF_TRIALS) trials
    //     console.log("cant handle it")
    // }

}