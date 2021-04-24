
module.exports = async (bot, data) => {
	
	for (const guild of data.guilds) {
		bot.guildcache.set(guild.id, guild);
	}
	
}