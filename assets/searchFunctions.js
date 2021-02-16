/* eslint-disable func-names */
/* eslint-disable consistent-return */

module.exports.characters = async function (search) {
	const json = require(`./characters/${search}`);
	if (!json) return null;

	return json;
};

module.exports.weapons = async (search) => {
	const json = require(`./characters/${search}`);
	if (!json) return;

	return json;
};

module.exports.elements = async (search) => {
	const json = require(`./elements/${search}`);
	if (!json) return;

	return json;
};

module.exports.potions = async (search) => {
	const json = require(`./potions/${search}`);
	if (!json) return;

	return json;
};
