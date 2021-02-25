const Discord = require('discord.js');

module.exports = {
    name: 'vote',
    description: 'Gives you the Vote link and checks if you voted.',
    usage: 'vote',
    aliases: ['up'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let voted = await bot.topgg.hasVoted(msg.author.id)
    let votes = await bot.topgg.getVotes()
	function filterByID(item) {
		if (item.id === msg.author.id) {
		  return true
		}
		return false;
	  }
	  
	  let arrByID = votes.filter(filterByID)
    let embed = new Discord.MessageEmbed()
        .setAuthor("Vote for " + bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(voted ? "You did Vote! \nThank you for the Support but you cant Vote right now!\n Please try again Later!\n\nYou already voted `"+arrByID.length+ "` time/s this Month!" : `You didn't Vote!\nConsider supporting us by Voting [here](https://top.gg/bot/${bot.user.id}/vote)!\n\nYou voted \`${arrByID.length}\` time/s this Month!\n*by voting you agree getting dmed with a thank you message*`)
        .setImage(voted? "https://thumbs.gfycat.com/BitesizedWellgroomedAlaskankleekai-size_restricted.gif" : "https://i.imgur.com/5BqfNXr.gif")
        .setColor(voted ? "GREEN" : "RED")
    return msg.reply(embed);
};
