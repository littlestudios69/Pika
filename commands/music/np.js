const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const {
    MessageEmbed
} = require("discord.js")
const ms = require("ms")
const Spotify = require("spotify-finder")
let config = require("../../config.json")
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
        secret: config.Spotify_ID // from v2.1.0 is required
    }
})
const canvas = require("canvas")
module.exports = {
    name: 'nowplaying',
    description: 'See what is playing',
    usage: 'nowplaying',
    aliases: ["np", "now"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return mins + ':' + secs;
}

module.exports.execute = async (bot, msg, args, data) => {

    function percentage(num, per) {
        return (num / 100) * per;
    }
    let client = bot
    let message = msg
    const player = client.music.players.get(message.guild.id);
    const embed = new MessageEmbed()

    if (!player) return message.channel.send("There literally is not player for this guild smh");
    if (!player.queue.current) return message.channel.send("There is no song playing in this guild!");
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
            return await message.channel.send(attachment)


        })
    if (found === true) return
    const time = ms(song.duration);
    const duration = time



    embed
        .setColor("RANDOM")
        .setTitle(`Currently Playing`)
        .setURL(song.uri)
        .setDescription(`\`\`\`${song.title}
        Requested by: ${song.requester.tag}\n
        Duration: ${duration}\n
        Position: ${ms(player.position)}\n
        ${player.position}
        ${percentage(song.duration, player.position)}
        ${client.progressBar(player.position, song.duration, "20")}
        
    `)
        .setThumbnail(song.thumbnail)
    message.channel.send(embed);





    function progressBar(percent) {
        let str = "";
        for (let i = 0; i < 12; i++) {
            if (i == parseInt(percent * 12))
                str += "\uD83D\uDD18"; // 🔘
            else
                str += "▬";
        }
        return str;
    }
}
