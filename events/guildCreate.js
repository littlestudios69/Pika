
module.exports = async (bot, guild) => {
	
	bot.guildcache.set(guild.id, guild);
	
}