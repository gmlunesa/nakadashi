const commando = require('discord.js-commando');
const bot = new commando.Client();

/*bot.on('message', (message) => {
	if (message.content == 'ping') {
		//message.reply('pong');
		message.channel.send('pong');
	}
});*/

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login('MzIwNzg2MTQ5MjI2NTc3OTIw.DBUi8Q.XOrERW_rMl1WNWkgCtfslUiKr30');

console.log('Bot successfully running');