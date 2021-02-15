module.exports = async(bot) => {
    try {
        const { MessageEmbed } = require("discord.js")

        let client = bot
        const Spotify  = require("erela.js-spotify");

        const clientID = "5c84fb675a8f4349baf262b059320fe1"; // clientID from your Spotify app
        const clientSecret = "f8908f39e2894c83826e0fe292f5560e"; // clientSecret from your Spotify app
        const nodes = [{
          host: "localhost",
          port: 2333,
          password: "youshallnotpass",
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
          let nodeid = 0
          bot.music.on("nodeConnect", (node) => {
            nodeid++
            bot.logger.log("New Lavalink Node Connected")
          });
          bot.music.on("nodeError", (node, error) => {
      
           bot.logger.error("Lavalink Error - " + error)
          });
          bot.music.on("trackStart", (player, track) => {
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
          await bot.music.init(bot.user.id)
      
          bot.on("raw", (d) => bot.music.updateVoiceState(d))
        bot.user.setPresence({ activity: { name: 'p*help | Little Pika V6', type: 'PLAYING' }, status: 'online' });
        bot.logger.ready(bot.user.tag + ' initialized.');
    } catch (err) {
        bot.logger.error('Ready event error - ' + err);
    }
};
