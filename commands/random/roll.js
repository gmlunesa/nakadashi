const commando = require('discord.js-commando');

class RollCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'random',
			memberName: 'roll',
			description: 'Rolls a dice'
		});
	}

	async run(message, args) {
		console.log(message.author.username);

		var splitMessage = (message.content).split(' ');
		var max = 0;

		if (splitMessage.length == 1) {
			max = 6;
		} else {
			console.log(splitMessage[1]);
			max = parseInt(splitMessage[1]);
		}

		var roll = Math.floor(Math.random() * max) + 1;
		message.channel.send(":thinking: **" + message.author.username + "**" +  " you rolled a " + roll);
		
	}
}

module.exports = RollCommand;