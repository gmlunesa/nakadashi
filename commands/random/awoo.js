const commando = require('discord.js-commando');

class AwooCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'awoo',
			group: 'random',
			memberName: 'awoo',
			description: 'Awoooo'
		});
	}

	async run(message, args) {
		message.channel.send("Awoo " + message.author.username);
	}
}

module.exports = AwooCommand;
