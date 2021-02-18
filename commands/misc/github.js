const Discord = require('discord.js');
const { isDuration } = require('moment');
const fetch = require("node-fetch");

module.exports = {
    name: 'github',
    description: 'Search up a Github Repository',
    usage: 'github <repo>',
    aliases: ["gh"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
    let repo = args.join(" ")
    if(!repo) return msg.reply("What repository am i supposed to show you?");

    const [username, repository] = repo.split("/");
    if(!username || !repo) return msg.reply("Repository must be in the form `username/repository`");

    const body = await fetch(`https://api.github.com/repos/${username}/${repository}`)
      .then((res) => res.ok && res.json())
      .catch(() => null);

    if(!body) return msg.reply("Could not fetch that repo, are you sure it exists?");

    const size = body.size <= 1024 ? `${body.size} KB` : Math.floor(body.size / 1024) > 1024 ? `${(body.size / 1024 / 1024).toFixed(2)} GB` : `${(body.size / 1024).toFixed(2)} MB`;
    const license = body.license && body.license.name && body.license.url ? `[${body.license.name}](${body.license.url})` : body.license && body.license.name || "None";
    const footer = [];
    if(body.fork) footer.push(`❯ **Forked** from [${body.parent.full_name}](${body.parent.html_url})`);
    if(body.archived) footer.push("❯ This repository is **Archived**");

    const embed = new Discord.MessageEmbed()
      .setTitle(body.full_name)
      .setColor("RANDOM")
      .setAuthor("GitHub", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
      .setURL(body.html_url)
      .setThumbnail(body.owner.avatar_url)
      .setDescription(`${body.description || "No Description."}\n\n❯ **Language:** ${body.language}\n❯ **Forks:** ${body.forks_count.toLocaleString()}\n❯ **License:** ${license}\n❯ **Open Issues:** ${body.open_issues.toLocaleString()}\n❯ **Watchers:** ${body.subscribers_count.toLocaleString()}\n❯ **Stars:** ${body.stargazers_count.toLocaleString()}\n❯ **Clone Size:** ${size}${footer.length ? `\n${footer.join("\n")}` : ""}`);

    return msg.reply({ embed });
}
