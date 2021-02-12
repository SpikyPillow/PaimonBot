const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const emojis = require('../../../assets/emojis.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['characterinfo'],
			description: 'Provides information on any attainable character',
			usage: '<character>',
			category: 'Information',
			guildOnly: true
		});
	}

	async run(message, [char]) {
		try {
			const { body } = await request.get('https://genshinlist.com/api/characters');
			const characterArray = [];

			if (!char) {
				const allChars = body.map(character => ({ name: character.name, vision: emojis[character.vision] }));
				for (const characters of allChars) {
					characterArray.push(` ${characters.vision} ${characters.name}`);
				}
				const allCharacters = new MessageEmbed()
					.setTitle('All Avaliable Characters')
					.setDescription(characterArray);
				return message.channel.send(allCharacters);
			}

			const charInfo = body.filter(obj => obj.slug === char.toLowerCase());

			const rarity = '⭐'.repeat(charInfo[0].rarity);
			const charEmbed = new MessageEmbed()
				.setTitle(`${charInfo[0].name} ${emojis[charInfo[0].vision]}`)
				.setThumbnail()
				.setColor()
				.addFields(
					{ name: `Rarity:`, value: `${rarity}` }
				);
			return message.channel.send(charEmbed);
		} catch (err) {
			console.error(err);
		}
	}

};
