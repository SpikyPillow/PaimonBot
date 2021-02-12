const Profile = require('../Models/profileSchema');

module.exports = class Economy {

	constructor(client) {
		this.client = client;
	}

	async getBalance(guildID, userID) {
		const wallet = await Profile.findOne({
			guildId: guildID,
			userId: userID
		});

		let totalMora = 0;
		let totalPrimos = 0;

		if (wallet) {
			totalMora = wallet.mora;
			totalPrimos = wallet.primogems;
		} else {
			const newData = new Profile({
				guildId: guildID,
				userId: userID,
				mora: totalMora,
				primogems: totalPrimos
			});

			await newData.save()
				.catch(err => console.log(err));
		}

		return [totalMora, totalPrimos];
	}


	async addMora(guildID, userID, mora) {
		const result = await Profile.findOneAndUpdate({
			guildId: guildID,
			userId: userID
		}, {
			guildId: guildID,
			userId: userID,
			$inc: {
				mora
			}
		}, {
			upsert: true,
			new: true,
			useFindAndModify: false
		});
		return result.mora;
	}

	async setMora(guildId, userId, mora) {
		const bal = await this.getMora(guildId, userId);
		await this.addMora(guildId, userId, -bal);
		const newBal = await this.addMora(guildId, userId, mora);
		return newBal;
	}

	async fetchLeaderboard(guildId, limit) {
		const users = await Profile.find({ guildId: guildId })
			.sort([['mora', 'descending']])
			.exec();

		return users.slice(0, limit);
	}

};
