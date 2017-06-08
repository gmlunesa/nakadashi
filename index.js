const commando = require('discord.js-commando');
const bot = new commando.Client();
const config = require('./config.js');
const database = require('./database/database');

/*bot.on('message', (message) => {
	if (message.content == 'ping') {
		//message.reply('pong');
		message.channel.send('pong');
	}
});*/

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('credits','Credits');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(config.TOKEN);
database.connect();

console.log('Bot successfully running');

module.exports = {
  client: bot
}
