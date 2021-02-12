const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const emojis = require('../../../assets/emojis.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bal'],
			description: '',
			category: 'Gacha',
			guildOnly: true
		});
	}

	async run(message, [user]) {
		const target = this.client.utils.getMember(message, user);
		const balance = await this.client.economy.getBalance(message.guild.id, target.id);
		console.log(balance);
		const balanceEmbed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Primogems', value: `${balance[1]} ${emojis.primogem}` },
				{ name: 'Mora', value: `${balance[0]} ${emojis.mora}` }
			);
		message.channel.send(balanceEmbed);
	}

};
