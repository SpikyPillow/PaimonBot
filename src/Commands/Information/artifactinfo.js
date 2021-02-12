const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['weapons'],
			description: 'Provides information on any attainable weapon',
			usage: '<weapon>',
			category: 'Information',
			guildOnly: true
		});
	}

	async run(message, args) {
		try {
			const { body } = await request.get('https://genshinlist.com/api/artifacts');

			const artifactInfo = body.filter(obj => obj.name.toLowerCase() === args.join(' '));
			console.log(artifactInfo);
		} catch (err) {
			console.error(err);
		}
	}

};
