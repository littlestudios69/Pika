
module.exports = async (bot, guild) => {
	
	bot.guildcache.delete(guild.id);
	
}