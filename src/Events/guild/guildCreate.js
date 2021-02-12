/* eslint-disable new-cap */
const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const guildSchema = require('../../Models/guildSchema');
const mongoose = require('mongoose');

module.exports = class extends Event {

	async run(guild) {
		await guildSchema.findOne({
			guildID: guild.id
		}, (err, server) => {
			if (err) console.error(err);
			if (!server) {
				// eslint-disable-next-line new-cap
				const newGuild = new guildSchema({
					// eslint-disable-next-line new-cap
					_id: mongoose.Types.ObjectId(),
					guildID: guild.id,
					guildName: guild.name,
					prefix: this.client.prefix,
					xp: false,
					levelUpMsg: false,
					eco: false
				});

				newGuild.save()
					.then(result => console.log(result))
					.catch(error => console.error(error));
			}
		});

		const channel = guild.channels.cache.find((ch) => ch.type === 'text' && ch.permissionsFor(guild.me).has('SEND_MESSAGES'));
		const guildJoin = new MessageEmbed()
			.setTitle('a')
			.addField('a', 'k')
			.setColor('fce3b7');
		channel.send(guildJoin);
	}

};
