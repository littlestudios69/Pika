const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    description: 'Evaluates some Code',
    usage: 'eval <code>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 1000,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let message = msg
     const input = args.join(' ');
    if (!input) return this.sendErrorMessage(message, 0, 'Please provide code to eval');
    if(!input.toLowerCase().includes('token')) {

      const embed = new MessageEmbed();

      try {
        let output = await eval(input);
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
        
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
          .setColor('#66FF00');

      } catch(err) {
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          .setColor('#FF0000');
      }

      message.channel.send(embed);

    } else {
      message.channel.send('(╯°□°)╯︵ ┻━┻ MY token. **MINE**.');
    }

}
