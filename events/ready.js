const ms = require("ms")
const Spotify = require("spotify-finder")
const Discord = require('discord.js');
let config = require("../config.json")

const Canvas = require('canvas'),
  {
    CanvasRenderingContext2D
  } = require('canvas');

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;

}

function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
const spotify = new Spotify({
  consumer: {
    key: config.Spotify_ID, // from v2.1.0 is required
    secret: config.Spotify_Token // from v2.1.0 is required
  }
})

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return mins + ':' + secs;
}

module.exports = async (bot) => {
  try {
    const {
      MessageEmbed
    } = require("discord.js")

    let client = bot
    const Spotify = require("erela.js-spotify");

    const clientID = bot.config.Spotify_ID; // clientID from your Spotify app
    const clientSecret = bot.config.Spotify_Token; // clientSecret from your Spotify app
    const nodes = [{
      host: bot.config.LV_HOST,
      port: bot.config.LV_PORT,
      password: bot.config.LV_PW,
    }]
    const {
      Manager
    } = require('erela.js');
    bot.music = new Manager({
      nodes: nodes,
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
      plugins: [
        // Initiate the plugin and pass the two required options.
        new Spotify({
          clientID,
          clientSecret,
          playlistLimit: 1,
          albumLimit: 2
        })
      ]
    });
    bot.music.on("nodeConnect", (node) => {
      bot.logger.ready("New Lavalink Node Connected")
    });
    bot.music.on("nodeError", (node, error) => {

      bot.logger.error("Lavalink Error - " + error)
    });
    bot.music.on("trackStart", async (player, track) => {
      let client = bot
      const song = player.queue.current;
      const params = {
        q: song.title.replace("(Official Audio)", "").replace("(Official Video)").replace("(Official Lyric Video)", "").replace(/ *\([^)]*\) */g, ""), // required
      }
      let found = false
      await spotify.search(params)
        .then(async data => {
          if (!data.tracks.items[0]) return
          found = true
          let artists = []
          data.tracks.items[0].artists.forEach(art => {
            artists.push(art.name)
          });


          const canvas = Canvas.createCanvas(1002, 116);
          const ctx = canvas.getContext('2d');

          ctx.fillStyle = '#282828'
          ctx.roundRect(0, 0, canvas.width, canvas.height, 25).fill();


          const image = await Canvas.loadImage(song.thumbnail);


          ctx.drawImage(image,
            30, 15,
            60, 60,
            30, 13,
            90, 90)

          ctx.fillStyle = '#1db954'
          if (data.tracks.items[0].explicit === true) {
            let image2 = await Canvas.loadImage('https://www.materialui.co/materialIcons/av/explicit_grey_192x192.png');
            ctx.drawImage(image2, 142, 27, 30, 30);
            let title = data.tracks.items[0].name
            ctx.font = "22px Sans"
            ctx.fillText(title, 180, 50)

          } else {
            let title = data.tracks.items[0].name
            ctx.font = "22px Sans"
            ctx.fillText(title, 145, 50)
          }

          if (!player.paused) {
            let image2 = await Canvas.loadImage('https://i.imgur.com/xV9eY1g.png?1');
            ctx.drawImage(image2, 540, 27, 40, 40);
          } else {
            let image2 = await Canvas.loadImage('https://i.imgur.com/wy6j9QB.png?1');
            ctx.drawImage(image2, 540, 27, 40, 40);
          }


          let volume = await Canvas.loadImage('https://i.imgur.com/niwTP8I.png?1');
          ctx.drawImage(volume, 865, 50, 20, 20);


          ctx.fillStyle = '#adb4aa'
          let artist = artists.join(", ")
          ctx.font = "22px Sans"
          ctx.fillText(artist, 145, 80)

          let timeplayed = msToTime(player.position)
          ctx.font = "20px Sans"
          ctx.fillText(timeplayed, 265, 99)
          let duration = msToTime(song.duration)
          ctx.fillText(duration, 780, 99)

          ctx.fillStyle = "#3b3b3b";
          ctx.roundRect(325, 91, 430, 5, 20).fill();

          let percent = (player.position * 100) / song.duration
          let percentWidth = (percent * 430) / 100;
          ctx.fillStyle = '#1db954'
          ctx.roundRect(325, 91, percentWidth, 5, 20).fill();


          ctx.fillStyle = '#3B3B3B';
          ctx.roundRect(890, 57, 75, 5, 20).fill();

          let perc = (player.volume * 100) / 100
          let percentWidth2 = (perc * 75) / 100;
          ctx.fillStyle = '#1db954'
          ctx.roundRect(890, 57, percentWidth2, 5, 20).fill();



          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'npcard.png')
          const channel = client.channels.cache.get(player.textChannel);
          return await channel.send(attachment)


        })
      if (found === true) return

      const embed = new MessageEmbed()
        .setColor(bot.config.color)
        .setDescription(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`)
        .setFooter(bot.config.credits)
        .setTimestamp()
      const channel = client.channels.cache.get(player.textChannel);
      channel.send(embed);
    });
    bot.music.on("queueEnd", player => {
      const embed = new MessageEmbed()
        .setColor(bot.config.color)
        .setDescription(`Queue has ended! Leaving...`)
        .setFooter(bot.config.credits)
        .setTimestamp()
      const channel = client.channels.cache.get(player.textChannel);
      channel.send(embed);
      player.destroy();
    });
    

    bot.on("raw", (d) => bot.music.updateVoiceState(d))
    bot.user.setPresence({
      activity: {
        name: 'p*help | Little Pika V6',
        type: 'PLAYING'
      },
      status: 'online'
    });
    bot.logger.ready(bot.user.tag + ' initialized.');
    await bot.music.init(bot.user.id)

    //Pika Stats, you dont really need this!
setInterval(async function(){
  if(bot.user.id === "576812872122761237") return;
    let gcs = 0
    await bot.guilds.cache.forEach(async guild => {
      let guildst = await bot.data.getGuildDB(guild.id);
      if (guildst.global !== "none") {
          gcs++
      } 
  });
  const moment = require("moment");
require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    bot.channels.resolve("812321761478705192").messages.fetch({around: "813490224784605235", limit: 1})
    .then(messages => {
      messages.first().edit(new Discord.MessageEmbed()
      .setAuthor("Little Pika Stats",bot.user.avatarURL({dynamic: true}))
      .addField("Servers", bot.guilds.cache.size, true)
      .addField("Users", bot.users.cache.size, true)
      .addField("Global Chats", gcs, true)
      .addFields(
      { name: 'Latency', value: bot.ws.ping + 'ms', inline: true },
      { name: 'Library', value: 'Discord.js V' + Discord.version+ "/tayron1", inline: true },
      {name: "Version", value: bot.config.Version, inline: true},
      {name: "Uptime", value: duration, inline: true},
      {name: "NodeJS Version", value: process.version, inline: true},
      {name: "Lavalink Players Running", value: bot.music.players.size, inline: true},

      )

      .setColor("RANDOM")
      .setFooter("Last Updated")
      .setTimestamp());
    });
  }, 60000)
  const express = require('express')
  const {
      Webhook
  } = require(`@top-gg/sdk`)

  const app = express()
  const wh = new Webhook(bot.config.webhook)

  app.post('/dblwebhook', wh.middleware(), async (req, res) => {
      
    let user = await bot.users.fetch(req.vote.user)
    let channel = await bot.channels.fetch("784479631951659028")
    let channel2 = await bot.channels.fetch("814509420926468176")
    let member = await bot.guilds.resolve("784062479918563328").members.fetch(req.vote.user)
    let votes = await bot.topgg.getVotes()
    function filterByID(item) {
      if (item.id === user.id) {
        return true
      }
      return false;
      }
      
      let arrByID = votes.filter(filterByID)
    let embed_user = new Discord.MessageEmbed()
    .setAuthor(`Thanks for Voting ${user.tag}!`, user.displayAvatarURL({dynamic: true}))
    .setDescription(`Thanks for Voting ${user.tag}!\nYou now have access to some more Commands!\nI hope you enjoy using me!\nIf you do then make sure to leave a Feedback **[here](https://top.gg/bot/${bot.user.id}#reviews)**\n\nYou can vote again in 12h!\n` + "You already voted `"+arrByID.length+ "` time/s this Month!\n*by voting you agree getting dmed with a thank you message*")
    .setColor("GREEN")
    .setImage("https://i.imgur.com/YWFnUkg.gif")
    .setFooter("Voted at")
    .setTimestamp()
    try{
      user.send(embed_user)
      if(member){
        try{
        member.roles.add("784453355647926293")
        }catch{}
      }
      if(channel){
      let embed = new Discord.MessageEmbed()
      .setAuthor(`Thanks for Voting ${user.tag}!`, user.displayAvatarURL({dynamic: true}))
      .setDescription(`Thanks for Voting ${user.tag}!\n\nYou can [vote](https://top.gg/bot/${bot.user.id}/vote) yourself **[here](https://top.gg/bot/${bot.user.id}/vote)**!\n` + user.tag +" already voted `"+arrByID.length+ "` time/s this Month!\nAll Time Votes: "+votes.length +"\n*by voting you agree getting dmed with a thank you message*")
      .setColor("GREEN")
      .setImage("https://i.imgur.com/YWFnUkg.gif")
      .setFooter("Voted at")
      .setTimestamp()
      channel.send(embed)
      }
      if(channel2){
      channel2.edit({name: `🆙 ${votes.length} Votes this Month`})
      }
    }catch{}
    
      
  })
  app.get("/", (req, res) => {
      res.send("Yes")
  })

  app.listen(3000)
  setInterval(() => {
    if(bot.user.id === "576812872122761237") return;
    bot.topgg.postStats({
      serverCount: bot.guilds.cache.size,
      shardCount: client.options.shardCount
    })
  }, 1800000) // post every 30 minutes
  } catch (err) {
    bot.logger.error('Ready event error - ' + err);
  }
};
